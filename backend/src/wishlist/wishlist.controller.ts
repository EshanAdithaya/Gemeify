import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { AddWishlistDto } from './dto/add-wishlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Wishlist')
@Controller('wishlist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiOperation({ summary: "Get the current user's wishlist" })
  async findMine(
    @Request() req: any,
    @Query('page') page = 1,
    @Query('limit') limit = 12,
  ) {
    const data = await this.wishlistService.findForUser(req.user.id, +page, +limit);
    return { message: 'Wishlist retrieved successfully', data };
  }

  @Get('count')
  @ApiOperation({ summary: "Count items in the current user's wishlist" })
  async count(@Request() req: any) {
    const count = await this.wishlistService.count(req.user.id);
    return { message: 'Wishlist count retrieved successfully', data: { count } };
  }

  @Get('check/:gemId')
  @ApiOperation({ summary: 'Check whether a gem is in the wishlist' })
  async check(@Request() req: any, @Param('gemId') gemId: string) {
    const inWishlist = await this.wishlistService.has(req.user.id, gemId);
    return { message: 'Wishlist status retrieved', data: { inWishlist } };
  }

  @Post()
  @ApiOperation({ summary: 'Add a gem to the wishlist' })
  async add(@Request() req: any, @Body() dto: AddWishlistDto) {
    const item = await this.wishlistService.add(req.user.id, dto.gemId);
    return { message: 'Gem added to wishlist', data: item };
  }

  @Delete(':gemId')
  @ApiOperation({ summary: 'Remove a gem from the wishlist' })
  async remove(@Request() req: any, @Param('gemId') gemId: string) {
    await this.wishlistService.remove(req.user.id, gemId);
    return { message: 'Gem removed from wishlist' };
  }
}
