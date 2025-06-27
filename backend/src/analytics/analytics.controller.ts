import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
import { AnalyticsQueryDto, TimeRange, GroupBy } from './dto/analytics-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { EventType, EventCategory } from './entities/analytics-event.entity';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  @ApiOperation({ summary: 'Track an analytics event' })
  @ApiResponse({ status: 201, description: 'Event tracked successfully' })
  async trackEvent(@Body() trackEventDto: TrackEventDto) {
    console.log('📊 Tracking analytics event:', trackEventDto.eventType);
    const event = await this.analyticsService.trackEvent(trackEventDto);
    return {
      message: 'Event tracked successfully',
      data: { event },
    };
  }

  @Get('events')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get analytics events with filtering' })
  @ApiQuery({ name: 'timeRange', enum: TimeRange, required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'eventCategory', enum: EventCategory, required: false })
  @ApiQuery({ name: 'eventType', enum: EventType, required: false })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'shopId', required: false })
  @ApiQuery({ name: 'groupBy', enum: GroupBy, required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getEvents(@Query() queryDto: AnalyticsQueryDto, @Request() req: any) {
    console.log(`📊 Getting analytics events for user: ${req.user.id}`);
    
    // If user is shop admin, filter to their shop only
    if (req.user.role === UserRole.SHOP_ADMIN && req.user.shop) {
      queryDto.shopId = req.user.shop.id;
    }
    
    const result = await this.analyticsService.getEvents(queryDto);
    return {
      message: 'Analytics events retrieved successfully',
      data: result,
    };
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get dashboard analytics' })
  async getDashboard(@Request() req: any, @Query('shopId') shopId?: string) {
    console.log(`📊 Getting dashboard analytics for user: ${req.user.id}`);
    
    // If user is shop admin, use their shop
    const targetShopId = req.user.role === UserRole.SHOP_ADMIN && req.user.shop 
      ? req.user.shop.id 
      : shopId;
    
    const stats = await this.analyticsService.getDashboardStats(targetShopId);
    return {
      message: 'Dashboard analytics retrieved successfully',
      data: stats,
    };
  }

  @Get('event-counts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get event counts by type' })
  async getEventCounts(@Query() queryDto: AnalyticsQueryDto, @Request() req: any) {
    console.log(`📊 Getting event counts for user: ${req.user.id}`);
    
    // If user is shop admin, filter to their shop only
    if (req.user.role === UserRole.SHOP_ADMIN && req.user.shop) {
      queryDto.shopId = req.user.shop.id;
    }
    
    const eventCounts = await this.analyticsService.getEventCounts(queryDto);
    return {
      message: 'Event counts retrieved successfully',
      data: eventCounts,
    };
  }

  @Get('time-series')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get time series analytics data' })
  async getTimeSeriesData(@Query() queryDto: AnalyticsQueryDto, @Request() req: any) {
    console.log(`📊 Getting time series data for user: ${req.user.id}`);
    
    // If user is shop admin, filter to their shop only
    if (req.user.role === UserRole.SHOP_ADMIN && req.user.shop) {
      queryDto.shopId = req.user.shop.id;
    }
    
    const timeSeriesData = await this.analyticsService.getTimeSeriesData(queryDto);
    return {
      message: 'Time series data retrieved successfully',
      data: timeSeriesData,
    };
  }

  @Get('top-events')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get top events' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'shopId', required: false })
  async getTopEvents(
    @Query('limit') limit = 10,
    @Query('shopId') shopId?: string,
    @Request() req?: any,
  ) {
    console.log(`📊 Getting top ${limit} events`);
    
    // If user is shop admin, use their shop
    const targetShopId = req?.user?.role === UserRole.SHOP_ADMIN && req.user.shop 
      ? req.user.shop.id 
      : shopId;
    
    const topEvents = await this.analyticsService.getTopEvents(+limit, targetShopId);
    return {
      message: 'Top events retrieved successfully',
      data: topEvents,
    };
  }

  @Get('revenue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get revenue analytics' })
  async getRevenueAnalytics(@Query() queryDto: AnalyticsQueryDto, @Request() req: any) {
    console.log(`💰 Getting revenue analytics for user: ${req.user.id}`);
    
    // If user is shop admin, filter to their shop only
    if (req.user.role === UserRole.SHOP_ADMIN && req.user.shop) {
      queryDto.shopId = req.user.shop.id;
    }
    
    const revenueAnalytics = await this.analyticsService.getRevenueAnalytics(queryDto);
    return {
      message: 'Revenue analytics retrieved successfully',
      data: revenueAnalytics,
    };
  }

  @Get('user-activity/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user activity statistics (Super Admin only)' })
  async getUserActivity(@Param('userId') userId: string) {
    console.log(`📊 Getting user activity stats for: ${userId}`);
    const userStats = await this.analyticsService.getUserActivityStats(userId);
    return {
      message: 'User activity statistics retrieved successfully',
      data: userStats,
    };
  }

  @Get('my-activity')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my activity statistics' })
  async getMyActivity(@Request() req: any) {
    console.log(`📊 Getting activity stats for user: ${req.user.id}`);
    const userStats = await this.analyticsService.getUserActivityStats(req.user.id);
    return {
      message: 'Your activity statistics retrieved successfully',
      data: userStats,
    };
  }

  @Post('generate-daily-stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate daily statistics (Super Admin only)' })
  async generateDailyStats(
    @Body() body: { date: string; shopId?: string },
  ) {
    console.log(`📊 Generating daily stats for: ${body.date}`);
    const date = new Date(body.date);
    const dailyStats = await this.analyticsService.generateDailyStats(date, body.shopId);
    return {
      message: 'Daily statistics generated successfully',
      data: { dailyStats },
    };
  }
}