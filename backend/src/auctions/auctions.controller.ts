import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { PlaceBidDto } from './dto/place-bid.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { AuctionStatus, AuctionType } from './entities/auction.entity';

@ApiTags('Auctions')
@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new auction' })
  @ApiResponse({ status: 201, description: 'Auction created successfully' })
  async create(@Body() createAuctionDto: CreateAuctionDto, @Request() req) {
    console.log(`🏛️ Creating auction for user: ${req.user.id}`);
    const auction = await this.auctionsService.create(createAuctionDto, req.user.id);
    return {
      message: 'Auction created successfully',
      data: { auction },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all auctions with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiQuery({ name: 'status', required: false, enum: AuctionStatus })
  @ApiQuery({ name: 'type', required: false, enum: AuctionType })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: AuctionStatus,
    @Query('type') type?: AuctionType,
  ) {
    console.log(`🔍 Getting auctions - Page: ${page}, Limit: ${limit}`);
    const result = await this.auctionsService.findAll(+page, +limit, status, type);
    return {
      message: 'Auctions retrieved successfully',
      data: result,
    };
  }

  @Get('live')
  @ApiOperation({ summary: 'Get all live auctions' })
  @ApiResponse({ status: 200, description: 'Live auctions retrieved successfully' })
  async findLive() {
    console.log('🔴 Getting live auctions');
    const auctions = await this.auctionsService.findLive();
    return {
      message: 'Live auctions retrieved successfully',
      data: { auctions },
    };
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get all upcoming auctions' })
  @ApiResponse({ status: 200, description: 'Upcoming auctions retrieved successfully' })
  async findUpcoming() {
    console.log('⏰ Getting upcoming auctions');
    const auctions = await this.auctionsService.findUpcoming();
    return {
      message: 'Upcoming auctions retrieved successfully',
      data: { auctions },
    };
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get auction statistics (Super Admin only)' })
  async getStats() {
    console.log('📊 Getting auction statistics');
    const stats = await this.auctionsService.getAuctionStats();
    return {
      message: 'Auction statistics retrieved successfully',
      data: stats,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get auction by ID' })
  @ApiResponse({ status: 200, description: 'Auction retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Auction not found' })
  async findOne(@Param('id') id: string) {
    console.log(`🔍 Getting auction: ${id}`);
    const auction = await this.auctionsService.findOne(id);
    return {
      message: 'Auction retrieved successfully',
      data: { auction },
    };
  }

  @Get(':id/bids')
  @ApiOperation({ summary: 'Get auction bids' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getAuctionBids(
    @Param('id') id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    console.log(`🔍 Getting bids for auction: ${id}`);
    const result = await this.auctionsService.getAuctionBids(id, +page, +limit);
    return {
      message: 'Auction bids retrieved successfully',
      data: result,
    };
  }

  @Post(':id/bids')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Place bid on auction' })
  @ApiResponse({ status: 201, description: 'Bid placed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid bid amount' })
  @ApiResponse({ status: 403, description: 'Cannot bid on own auction' })
  async placeBid(
    @Param('id') id: string,
    @Body() placeBidDto: PlaceBidDto,
    @Request() req,
  ) {
    console.log(`💰 Placing bid on auction ${id} by user: ${req.user.id}`);
    const bid = await this.auctionsService.placeBid(id, placeBidDto, req.user.id);
    return {
      message: 'Bid placed successfully',
      data: { bid },
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update auction' })
  @ApiResponse({ status: 200, description: 'Auction updated successfully' })
  @ApiResponse({ status: 400, description: 'Cannot update live auction' })
  async update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    console.log(`🔄 Updating auction: ${id}`);
    const auction = await this.auctionsService.update(id, updateAuctionDto);
    return {
      message: 'Auction updated successfully',
      data: { auction },
    };
  }

  @Patch(':id/end')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'End auction early' })
  @ApiResponse({ status: 200, description: 'Auction ended successfully' })
  async endAuction(@Param('id') id: string) {
    console.log(`🏁 Ending auction: ${id}`);
    const auction = await this.auctionsService.endAuction(id);
    return {
      message: 'Auction ended successfully',
      data: { auction },
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete auction' })
  @ApiResponse({ status: 200, description: 'Auction deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete live auction with bids' })
  async remove(@Param('id') id: string) {
    console.log(`🗑️ Deleting auction: ${id}`);
    await this.auctionsService.remove(id);
    return {
      message: 'Auction deleted successfully',
    };
  }
}