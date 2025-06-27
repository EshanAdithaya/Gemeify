import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan, LessThan, In } from 'typeorm';
import { AnalyticsEvent, EventType, EventCategory } from './entities/analytics-event.entity';
import { DailyStats } from './entities/daily-stats.entity';
import { TrackEventDto } from './dto/track-event.dto';
import { AnalyticsQueryDto, TimeRange, GroupBy } from './dto/analytics-query.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent)
    private readonly analyticsEventRepository: Repository<AnalyticsEvent>,
    @InjectRepository(DailyStats)
    private readonly dailyStatsRepository: Repository<DailyStats>,
  ) {}

  async trackEvent(trackEventDto: TrackEventDto): Promise<AnalyticsEvent> {
    console.log('📊 Tracking analytics event:', trackEventDto.eventType);
    
    const event = this.analyticsEventRepository.create({
      ...trackEventDto,
      user: trackEventDto.userId ? { id: trackEventDto.userId } : null,
      shop: trackEventDto.shopId ? { id: trackEventDto.shopId } : null,
    });

    const savedEvent = await this.analyticsEventRepository.save(event);
    console.log('✅ Analytics event tracked:', savedEvent.id);
    
    return savedEvent;
  }

  async getEvents(queryDto: AnalyticsQueryDto) {
    console.log('📊 Getting analytics events with query:', queryDto);
    
    const { startDate, endDate } = this.getDateRange(queryDto);
    const queryBuilder = this.analyticsEventRepository.createQueryBuilder('event')
      .where('event.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('event.createdAt', 'DESC');

    // Apply filters
    if (queryDto.eventCategory) {
      queryBuilder.andWhere('event.eventCategory = :eventCategory', { 
        eventCategory: queryDto.eventCategory 
      });
    }

    if (queryDto.eventType) {
      queryBuilder.andWhere('event.eventType = :eventType', { 
        eventType: queryDto.eventType 
      });
    }

    if (queryDto.userId) {
      queryBuilder.andWhere('event.userId = :userId', { userId: queryDto.userId });
    }

    if (queryDto.shopId) {
      queryBuilder.andWhere('event.shopId = :shopId', { shopId: queryDto.shopId });
    }

    if (queryDto.country) {
      queryBuilder.andWhere('event.country = :country', { country: queryDto.country });
    }

    if (queryDto.deviceType) {
      queryBuilder.andWhere('event.deviceType = :deviceType', { 
        deviceType: queryDto.deviceType 
      });
    }

    if (queryDto.browser) {
      queryBuilder.andWhere('event.browser = :browser', { browser: queryDto.browser });
    }

    const [events, total] = await queryBuilder
      .skip((queryDto.page - 1) * queryDto.limit)
      .take(queryDto.limit)
      .getManyAndCount();

    console.log(`📊 Found ${total} analytics events`);

    return {
      data: events,
      total,
      page: queryDto.page,
      limit: queryDto.limit,
      totalPages: Math.ceil(total / queryDto.limit),
    };
  }

  async getEventCounts(queryDto: AnalyticsQueryDto) {
    console.log('📊 Getting event counts with query:', queryDto);
    
    const { startDate, endDate } = this.getDateRange(queryDto);
    const queryBuilder = this.analyticsEventRepository.createQueryBuilder('event')
      .select('event.eventType', 'eventType')
      .addSelect('COUNT(*)', 'count')
      .where('event.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('event.eventType')
      .orderBy('count', 'DESC');

    // Apply filters
    if (queryDto.shopId) {
      queryBuilder.andWhere('event.shopId = :shopId', { shopId: queryDto.shopId });
    }

    const results = await queryBuilder.getRawMany();
    
    const eventCounts = results.reduce((acc, result) => {
      acc[result.eventType] = parseInt(result.count);
      return acc;
    }, {});

    console.log('📊 Event counts:', eventCounts);
    return eventCounts;
  }

  async getTimeSeriesData(queryDto: AnalyticsQueryDto) {
    console.log('📊 Getting time series data:', queryDto);
    
    const { startDate, endDate } = this.getDateRange(queryDto);
    const format = this.getDateFormat(queryDto.groupBy);
    
    const queryBuilder = this.analyticsEventRepository.createQueryBuilder('event')
      .select(`DATE_FORMAT(event.createdAt, '${format}')`, 'period')
      .addSelect('COUNT(*)', 'count')
      .where('event.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('period')
      .orderBy('period', 'ASC');

    // Apply filters
    if (queryDto.eventType) {
      queryBuilder.andWhere('event.eventType = :eventType', { 
        eventType: queryDto.eventType 
      });
    }

    if (queryDto.shopId) {
      queryBuilder.andWhere('event.shopId = :shopId', { shopId: queryDto.shopId });
    }

    const results = await queryBuilder.getRawMany();
    
    const timeSeriesData = results.map(result => ({
      period: result.period,
      count: parseInt(result.count),
    }));

    console.log(`📊 Time series data: ${timeSeriesData.length} data points`);
    return timeSeriesData;
  }

  async getDashboardStats(shopId?: string) {
    console.log(`📊 Getting dashboard stats${shopId ? ` for shop: ${shopId}` : ' (global)'}`);
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);
    
    const last30Days = new Date(today);
    last30Days.setDate(last30Days.getDate() - 30);

    const baseQuery = shopId 
      ? { shop: { id: shopId } }
      : {};

    // Get today's stats
    const todayStats = await this.getStatsForPeriod(today, today, baseQuery);
    
    // Get yesterday's stats
    const yesterdayStats = await this.getStatsForPeriod(yesterday, yesterday, baseQuery);
    
    // Get last 7 days stats
    const last7DaysStats = await this.getStatsForPeriod(last7Days, today, baseQuery);
    
    // Get last 30 days stats
    const last30DaysStats = await this.getStatsForPeriod(last30Days, today, baseQuery);

    // Calculate growth rates
    const calculateGrowth = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const stats = {
      today: todayStats,
      yesterday: yesterdayStats,
      last7Days: last7DaysStats,
      last30Days: last30DaysStats,
      growth: {
        dailyGrowth: calculateGrowth(todayStats.totalEvents, yesterdayStats.totalEvents),
        weeklyGrowth: calculateGrowth(last7DaysStats.totalEvents, 0), // Compare with previous week
        monthlyGrowth: calculateGrowth(last30DaysStats.totalEvents, 0), // Compare with previous month
      },
    };

    console.log('📊 Dashboard stats generated');
    return stats;
  }

  async getTopEvents(limit = 10, shopId?: string) {
    console.log(`📊 Getting top ${limit} events${shopId ? ` for shop: ${shopId}` : ''}`);
    
    const queryBuilder = this.analyticsEventRepository.createQueryBuilder('event')
      .select('event.eventType', 'eventType')
      .addSelect('event.eventName', 'eventName')
      .addSelect('COUNT(*)', 'count')
      .groupBy('event.eventType, event.eventName')
      .orderBy('count', 'DESC')
      .limit(limit);

    if (shopId) {
      queryBuilder.where('event.shopId = :shopId', { shopId });
    }

    const results = await queryBuilder.getRawMany();
    
    const topEvents = results.map(result => ({
      eventType: result.eventType,
      eventName: result.eventName,
      count: parseInt(result.count),
    }));

    console.log(`📊 Top events: ${topEvents.length} results`);
    return topEvents;
  }

  async getUserActivityStats(userId: string) {
    console.log(`📊 Getting user activity stats for: ${userId}`);
    
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const userEvents = await this.analyticsEventRepository.find({
      where: {
        user: { id: userId },
        createdAt: MoreThan(last30Days),
      },
      order: { createdAt: 'DESC' },
      take: 1000, // Limit to prevent performance issues
    });

    // Group events by type
    const eventsByType = userEvents.reduce((acc, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate activity by day
    const activityByDay = userEvents.reduce((acc, event) => {
      const day = event.createdAt.toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const stats = {
      totalEvents: userEvents.length,
      eventsByType,
      activityByDay,
      lastActivity: userEvents.length > 0 ? userEvents[0].createdAt : null,
      averageDailyActivity: userEvents.length / 30,
    };

    console.log(`📊 User activity stats generated for: ${userId}`);
    return stats;
  }

  async getRevenueAnalytics(queryDto: AnalyticsQueryDto) {
    console.log('💰 Getting revenue analytics:', queryDto);
    
    const { startDate, endDate } = this.getDateRange(queryDto);
    
    // Get revenue events (orders, auctions, payments)
    const revenueEvents = await this.analyticsEventRepository.find({
      where: {
        eventType: In([
          EventType.ORDER_PAID,
          EventType.PAYMENT_COMPLETED,
          EventType.AUCTION_WON,
        ]),
        createdAt: Between(startDate, endDate),
        ...(queryDto.shopId && { shop: { id: queryDto.shopId } }),
      },
    });

    const totalRevenue = revenueEvents.reduce((sum, event) => {
      return sum + (event.properties?.amount || 0);
    }, 0);

    const averageOrderValue = revenueEvents.length > 0 
      ? totalRevenue / revenueEvents.length 
      : 0;

    const revenueByDay = revenueEvents.reduce((acc, event) => {
      const day = event.createdAt.toISOString().split('T')[0];
      acc[day] = (acc[day] || 0) + (event.properties?.amount || 0);
      return acc;
    }, {} as Record<string, number>);

    const analytics = {
      totalRevenue,
      totalTransactions: revenueEvents.length,
      averageOrderValue,
      revenueByDay,
    };

    console.log('💰 Revenue analytics generated');
    return analytics;
  }

  async generateDailyStats(date: Date, shopId?: string): Promise<DailyStats> {
    console.log(`📊 Generating daily stats for ${date.toISOString().split('T')[0]}${shopId ? ` (shop: ${shopId})` : ''}`);
    
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const baseQuery = shopId 
      ? { shop: { id: shopId }, createdAt: Between(startOfDay, endOfDay) }
      : { createdAt: Between(startOfDay, endOfDay) };

    // Get all events for the day
    const events = await this.analyticsEventRepository.find({
      where: baseQuery,
    });

    // Calculate metrics
    const metrics = this.calculateDailyMetrics(events);

    // Check if stats already exist
    const existingStats = await this.dailyStatsRepository.findOne({
      where: {
        date: startOfDay,
        shopId: shopId || null,
      },
    });

    let dailyStats: DailyStats;
    
    if (existingStats) {
      Object.assign(existingStats, metrics);
      dailyStats = await this.dailyStatsRepository.save(existingStats);
    } else {
      dailyStats = this.dailyStatsRepository.create({
        date: startOfDay,
        shopId: shopId || null,
        ...metrics,
      });
      dailyStats = await this.dailyStatsRepository.save(dailyStats);
    }

    console.log('✅ Daily stats generated/updated');
    return dailyStats;
  }

  private async getStatsForPeriod(startDate: Date, endDate: Date, baseQuery: any) {
    const events = await this.analyticsEventRepository.find({
      where: {
        ...baseQuery,
        createdAt: Between(startDate, endDate),
      },
    });

    return {
      totalEvents: events.length,
      userEvents: events.filter(e => e.eventCategory === EventCategory.USER).length,
      gemEvents: events.filter(e => e.eventCategory === EventCategory.GEM).length,
      auctionEvents: events.filter(e => e.eventCategory === EventCategory.AUCTION).length,
      orderEvents: events.filter(e => e.eventCategory === EventCategory.ORDER).length,
    };
  }

  private calculateDailyMetrics(events: AnalyticsEvent[]) {
    const metrics = {
      // User metrics
      newUsers: events.filter(e => e.eventType === EventType.USER_REGISTERED).length,
      userLogins: events.filter(e => e.eventType === EventType.USER_LOGIN).length,
      
      // Gem metrics
      gemsCreated: events.filter(e => e.eventType === EventType.GEM_CREATED).length,
      gemsViewed: events.filter(e => e.eventType === EventType.GEM_VIEWED).length,
      gemsLiked: events.filter(e => e.eventType === EventType.GEM_LIKED).length,
      
      // Auction metrics
      auctionsCreated: events.filter(e => e.eventType === EventType.AUCTION_CREATED).length,
      auctionsStarted: events.filter(e => e.eventType === EventType.AUCTION_STARTED).length,
      bidsPlaced: events.filter(e => e.eventType === EventType.BID_PLACED).length,
      
      // Order metrics
      ordersCreated: events.filter(e => e.eventType === EventType.ORDER_CREATED).length,
      ordersPaid: events.filter(e => e.eventType === EventType.ORDER_PAID).length,
      
      // Revenue metrics
      totalRevenue: events
        .filter(e => e.isRevenueEvent)
        .reduce((sum, e) => sum + (e.properties?.amount || 0), 0),
      
      // Review metrics
      reviewsCreated: events.filter(e => e.eventType === EventType.REVIEW_CREATED).length,
      
      // Search metrics
      searchesPerformed: events.filter(e => e.eventType === EventType.SEARCH_PERFORMED).length,
      
      // Payment metrics
      paymentsInitiated: events.filter(e => e.eventType === EventType.PAYMENT_INITIATED).length,
      paymentsCompleted: events.filter(e => e.eventType === EventType.PAYMENT_COMPLETED).length,
      paymentsFailed: events.filter(e => e.eventType === EventType.PAYMENT_FAILED).length,
      
      // Error metrics
      errorsOccurred: events.filter(e => e.eventType === EventType.ERROR_OCCURRED).length,
    };

    return metrics;
  }

  private getDateRange(queryDto: AnalyticsQueryDto) {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    switch (queryDto.timeRange) {
      case TimeRange.TODAY:
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
        break;
      case TimeRange.YESTERDAY:
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        break;
      case TimeRange.LAST_7_DAYS:
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case TimeRange.LAST_30_DAYS:
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 30);
        break;
      case TimeRange.LAST_90_DAYS:
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 90);
        break;
      case TimeRange.LAST_YEAR:
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case TimeRange.CUSTOM:
        startDate = queryDto.startDate ? new Date(queryDto.startDate) : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        endDate = queryDto.endDate ? new Date(queryDto.endDate) : now;
        break;
      default:
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
    }

    return { startDate, endDate };
  }

  private getDateFormat(groupBy: GroupBy): string {
    switch (groupBy) {
      case GroupBy.HOUR:
        return '%Y-%m-%d %H:00:00';
      case GroupBy.DAY:
        return '%Y-%m-%d';
      case GroupBy.WEEK:
        return '%Y-%u';
      case GroupBy.MONTH:
        return '%Y-%m';
      case GroupBy.YEAR:
        return '%Y';
      default:
        return '%Y-%m-%d';
    }
  }
}

