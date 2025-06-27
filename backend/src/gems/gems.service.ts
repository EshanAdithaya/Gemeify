import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gem } from './entities/gem.entity';

@Injectable()
export class GemsService {
  constructor(
    @InjectRepository(Gem)
    private readonly gemRepository: Repository<Gem>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const [gems, total] = await this.gemRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['shop', 'category'],
    });

    return {
      data: gems,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return await this.gemRepository.findOne({ 
      where: { id },
      relations: ['shop', 'category', 'reviews'] 
    });
  }
}