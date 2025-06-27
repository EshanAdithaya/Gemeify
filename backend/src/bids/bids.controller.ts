import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BidsService } from './bids.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Bids')
@Controller('bids')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Get('my-bids')
  @ApiOperation({ summary: 'Get my bids' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getMyBids(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Request() req,
  ) {
    console.log(`🔍 Getting bids for user: ${req.user.id}`);
    const result = await this.bidsService.getMyBids(req.user.id, +page, +limit);
    return {
      message: 'Bids retrieved successfully',
      data: result,
    };
  }
}