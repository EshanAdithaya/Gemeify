import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
  ) {}

  async getMyBids(userId: string, page = 1, limit = 10) {
    console.log(`🔍 Getting bids for user: ${userId}`);
    
    const [bids, total] = await this.bidRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['auction', 'auction.gem'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    console.log(`📊 Found ${total} bids for user ${userId}`);

    return {
      data: bids,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}