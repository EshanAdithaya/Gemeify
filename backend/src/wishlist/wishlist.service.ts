import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistItem } from './entities/wishlist-item.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistItem)
    private readonly wishlistRepository: Repository<WishlistItem>,
  ) {}

  /** Add a gem to a user's wishlist. Idempotent: re-adding returns the
   *  existing entry instead of creating a duplicate. */
  async add(userId: string, gemId: string): Promise<WishlistItem> {
    const existing = await this.wishlistRepository.findOne({
      where: { user: { id: userId }, gem: { id: gemId } },
      relations: ['gem'],
    });
    if (existing) return existing;

    const item = this.wishlistRepository.create({
      user: { id: userId } as any,
      gem: { id: gemId } as any,
    });
    return this.wishlistRepository.save(item);
  }

  async remove(userId: string, gemId: string): Promise<void> {
    const result = await this.wishlistRepository.delete({
      user: { id: userId } as any,
      gem: { id: gemId } as any,
    });
    if (!result.affected) {
      throw new NotFoundException('Gem is not in your wishlist');
    }
  }

  async findForUser(userId: string, page = 1, limit = 12) {
    const [items, total] = await this.wishlistRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['gem', 'gem.shop', 'gem.category'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async has(userId: string, gemId: string): Promise<boolean> {
    const count = await this.wishlistRepository.count({
      where: { user: { id: userId }, gem: { id: gemId } },
    });
    return count > 0;
  }

  async count(userId: string): Promise<number> {
    return this.wishlistRepository.count({ where: { user: { id: userId } } });
  }
}
