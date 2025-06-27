import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShopsService } from './shops.service';

@ApiTags('Shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  async findAll() {
    const shops = await this.shopsService.findAll();
    return { message: 'Shops retrieved successfully', data: shops };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shop = await this.shopsService.findOne(id);
    return { message: 'Shop retrieved successfully', data: shop };
  }
}