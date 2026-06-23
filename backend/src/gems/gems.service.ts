import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gem, GemStatus } from './entities/gem.entity';
import { CreateGemDto } from './dto/create-gem.dto';
import { UpdateGemDto } from './dto/update-gem.dto';
import { QueryGemsDto } from './dto/query-gems.dto';

@Injectable()
export class GemsService {
  constructor(
    @InjectRepository(Gem)
    private readonly gemRepository: Repository<Gem>,
  ) {}

  private slugify(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    const base = this.slugify(name) || 'gem';
    let slug = base;
    let counter = 1;
    while (await this.gemRepository.findOne({ where: { slug } })) {
      slug = `${base}-${counter++}`;
    }
    return slug;
  }

  async create(dto: CreateGemDto): Promise<Gem> {
    const { categoryId, shopId, ...rest } = dto;
    const slug = await this.generateUniqueSlug(dto.name);
    const gem = this.gemRepository.create({
      ...rest,
      slug,
      mainImage: dto.mainImage || dto.images?.[0],
      status: GemStatus.PENDING,
      isApproved: false,
      category: { id: categoryId } as any,
      shop: { id: shopId } as any,
    });
    return this.gemRepository.save(gem);
  }

  async findAll(query: QueryGemsDto) {
    const {
      page = 1,
      limit = 12,
      search,
      categoryId,
      shopId,
      status,
      minPrice,
      maxPrice,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const qb = this.gemRepository
      .createQueryBuilder('gem')
      .leftJoinAndSelect('gem.shop', 'shop')
      .leftJoinAndSelect('gem.category', 'category');

    if (search) {
      qb.andWhere(
        '(gem.name LIKE :search OR gem.description LIKE :search OR gem.color LIKE :search)',
        { search: `%${search}%` },
      );
    }
    if (categoryId) qb.andWhere('category.id = :categoryId', { categoryId });
    if (shopId) qb.andWhere('shop.id = :shopId', { shopId });
    if (status) qb.andWhere('gem.status = :status', { status });
    if (featured) qb.andWhere('gem.isFeatured = :featured', { featured: true });
    if (minPrice !== undefined) qb.andWhere('gem.price >= :minPrice', { minPrice });
    if (maxPrice !== undefined) qb.andWhere('gem.price <= :maxPrice', { maxPrice });

    qb.orderBy(`gem.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit);

    const [gems, total] = await qb.getManyAndCount();

    return {
      data: gems,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /** Public catalog: only approved gems are visible to buyers. */
  async findPublic(query: QueryGemsDto) {
    return this.findAll({ ...query, status: GemStatus.APPROVED });
  }

  async findOne(id: string): Promise<Gem> {
    const gem = await this.gemRepository.findOne({
      where: { id },
      relations: ['shop', 'category', 'reviews'],
    });
    if (!gem) throw new NotFoundException(`Gem ${id} not found`);
    return gem;
  }

  async findBySlug(slug: string): Promise<Gem> {
    const gem = await this.gemRepository.findOne({
      where: { slug },
      relations: ['shop', 'category', 'reviews'],
    });
    if (!gem) throw new NotFoundException(`Gem "${slug}" not found`);
    await this.gemRepository.increment({ id: gem.id }, 'views', 1);
    gem.views += 1;
    return gem;
  }

  async update(id: string, dto: UpdateGemDto): Promise<Gem> {
    const gem = await this.findOne(id);
    const { categoryId, shopId, ...rest } = dto;
    Object.assign(gem, rest);
    if (categoryId) gem.category = { id: categoryId } as any;
    if (shopId) gem.shop = { id: shopId } as any;
    return this.gemRepository.save(gem);
  }

  async remove(id: string): Promise<void> {
    const result = await this.gemRepository.delete(id);
    if (!result.affected) throw new NotFoundException(`Gem ${id} not found`);
  }

  async approve(id: string): Promise<Gem> {
    const gem = await this.findOne(id);
    if (gem.status === GemStatus.APPROVED) {
      throw new ConflictException('Gem is already approved');
    }
    gem.status = GemStatus.APPROVED;
    gem.isApproved = true;
    return this.gemRepository.save(gem);
  }

  async reject(id: string, reason?: string): Promise<Gem> {
    const gem = await this.findOne(id);
    gem.status = GemStatus.REJECTED;
    gem.isApproved = false;
    // Reason is surfaced to the seller via notifications/audit, not stored on
    // the public SEO fields. A dedicated moderation column is tracked as debt.
    if (reason) {
      // eslint-disable-next-line no-console
      console.log(`📋 Gem ${id} rejected: ${reason}`);
    }
    return this.gemRepository.save(gem);
  }

  async getStats() {
    const [total, pending, approved, sold] = await Promise.all([
      this.gemRepository.count(),
      this.gemRepository.count({ where: { status: GemStatus.PENDING } }),
      this.gemRepository.count({ where: { status: GemStatus.APPROVED } }),
      this.gemRepository.count({ where: { status: GemStatus.SOLD } }),
    ]);
    return { total, pending, approved, sold };
  }
}
