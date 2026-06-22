import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { RespondReviewDto } from './dto/respond-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('gem/:gemId')
  @ApiOperation({ summary: 'List approved reviews for a gem' })
  async findForGem(
    @Param('gemId') gemId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const data = await this.reviewsService.findForGem(gemId, +page, +limit);
    return { message: 'Reviews retrieved successfully', data };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Write a review for a gem' })
  async create(@Request() req: any, @Body() dto: CreateReviewDto) {
    const review = await this.reviewsService.create(req.user.id, dto);
    return { message: 'Review submitted successfully', data: review };
  }

  @Patch(':id/helpful')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Vote a review helpful or not helpful' })
  async vote(@Param('id') id: string, @Body('helpful') helpful: boolean) {
    const review = await this.reviewsService.voteHelpful(id, helpful);
    return { message: 'Vote recorded', data: review };
  }

  @Patch(':id/respond')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Respond to a review (shop owner)' })
  async respond(@Param('id') id: string, @Body() dto: RespondReviewDto) {
    const review = await this.reviewsService.respond(id, dto.response);
    return { message: 'Response posted', data: review };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete your review' })
  async remove(@Request() req: any, @Param('id') id: string) {
    await this.reviewsService.remove(req.user.id, id);
    return { message: 'Review deleted successfully' };
  }
}
