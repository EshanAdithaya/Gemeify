import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { GemsService } from './gems.service';

@ApiTags('Gems')
@Controller('gems')
export class GemsController {
  constructor(private readonly gemsService: GemsService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const result = await this.gemsService.findAll(+page, +limit);
    return { message: 'Gems retrieved successfully', data: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const gem = await this.gemsService.findOne(id);
    return { message: 'Gem retrieved successfully', data: gem };
  }
}