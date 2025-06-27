import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async findAll() {
    return await this.shopRepository.find();
  }

  async findOne(id: string) {
    return await this.shopRepository.findOne({ where: { id } });
  }
}