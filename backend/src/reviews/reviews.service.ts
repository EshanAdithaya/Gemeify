import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review, ReviewStatus } from './entities/review.entity';
import { Gem } from '../gems/entities/gem.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Gem)
    private readonly gemRepository: Repository<Gem>,
  ) {}

  async create(userId: string, dto: CreateReviewDto): Promise<Review> {
    const gem = await this.gemRepository.findOne({
      where: { id: dto.gemId },
      relations: ['shop'],
    });
    if (!gem) throw new NotFoundException(`Gem ${dto.gemId} not found`);

    const already = await this.reviewRepository.findOne({
      where: { user: { id: userId }, gem: { id: dto.gemId } },
    });
    if (already) {
      throw new ConflictException('You have already reviewed this gem');
    }

    const review = this.reviewRepository.create({
      rating: dto.rating,
      title: dto.title,
      comment: dto.comment,
      images: dto.images,
      status: ReviewStatus.APPROVED,
      user: { id: userId } as any,
      gem: { id: dto.gemId } as any,
      shop: gem.shop ? ({ id: gem.shop.id } as any) : null,
    });
    const saved = await this.reviewRepository.save(review);
    await this.recomputeGemRating(dto.gemId);
    return saved;
  }

  /** Recompute the cached rating average and review count on the gem so the
   *  catalog never shows stale stars. */
  async recomputeGemRating(gemId: string): Promise<void> {
    const { avg, count } = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoin('review.gem', 'gem')
      .select('AVG(review.rating)', 'avg')
      .addSelect('COUNT(review.id)', 'count')
      .where('gem.id = :gemId', { gemId })
      .andWhere('review.status = :status', { status: ReviewStatus.APPROVED })
      .getRawOne();

    await this.gemRepository.update(gemId, {
      rating: count > 0 ? Number(Number(avg).toFixed(2)) : 0,
      totalReviews: Number(count),
    });
  }

  async findForGem(gemId: string, page = 1, limit = 10) {
    const [reviews, total] = await this.reviewRepository.findAndCount({
      where: { gem: { id: gemId }, status: ReviewStatus.APPROVED },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: reviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'gem', 'shop'],
    });
    if (!review) throw new NotFoundException(`Review ${id} not found`);
    return review;
  }

  async respond(id: string, response: string): Promise<Review> {
    const review = await this.findOne(id);
    review.shopResponse = response;
    review.shopResponseAt = new Date();
    return this.reviewRepository.save(review);
  }

  async voteHelpful(id: string, helpful: boolean): Promise<Review> {
    const review = await this.findOne(id);
    if (helpful) review.helpfulVotes += 1;
    else review.notHelpfulVotes += 1;
    return this.reviewRepository.save(review);
  }

  async remove(userId: string, id: string): Promise<void> {
    const review = await this.findOne(id);
    if (review.user?.id !== userId) {
      throw new ForbiddenException('You can only delete your own review');
    }
    const gemId = review.gem.id;
    await this.reviewRepository.delete(id);
    await this.recomputeGemRating(gemId);
  }
}
