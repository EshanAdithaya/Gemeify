import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GemsService } from './gems.service';
import { CreateGemDto } from './dto/create-gem.dto';
import { UpdateGemDto } from './dto/update-gem.dto';
import { QueryGemsDto } from './dto/query-gems.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Gems')
@Controller('gems')
export class GemsController {
  constructor(private readonly gemsService: GemsService) {}

  @Get()
  @ApiOperation({ summary: 'Browse the public catalog (approved gems only)' })
  async findAll(@Query() query: QueryGemsDto) {
    const result = await this.gemsService.findPublic(query);
    return { message: 'Gems retrieved successfully', data: result };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List gems across all statuses (admin)' })
  async findAllAdmin(@Query() query: QueryGemsDto) {
    const result = await this.gemsService.findAll(query);
    return { message: 'Gems retrieved successfully', data: result };
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Catalog statistics (admin)' })
  async stats() {
    const data = await this.gemsService.getStats();
    return { message: 'Gem statistics retrieved successfully', data };
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a gem by slug (increments view count)' })
  async findBySlug(@Param('slug') slug: string) {
    const gem = await this.gemsService.findBySlug(slug);
    return { message: 'Gem retrieved successfully', data: gem };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a gem by id' })
  async findOne(@Param('id') id: string) {
    const gem = await this.gemsService.findOne(id);
    return { message: 'Gem retrieved successfully', data: gem };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a gem listing' })
  async create(@Body() dto: CreateGemDto) {
    const gem = await this.gemsService.create(dto);
    return { message: 'Gem created successfully', data: gem };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a gem listing' })
  async update(@Param('id') id: string, @Body() dto: UpdateGemDto) {
    const gem = await this.gemsService.update(id, dto);
    return { message: 'Gem updated successfully', data: gem };
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve a gem listing' })
  async approve(@Param('id') id: string) {
    const gem = await this.gemsService.approve(id);
    return { message: 'Gem approved successfully', data: gem };
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reject a gem listing' })
  async reject(@Param('id') id: string, @Body('reason') reason?: string) {
    const gem = await this.gemsService.reject(id, reason);
    return { message: 'Gem rejected successfully', data: gem };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a gem listing' })
  async remove(@Param('id') id: string) {
    await this.gemsService.remove(id);
    return { message: 'Gem deleted successfully' };
  }
}
