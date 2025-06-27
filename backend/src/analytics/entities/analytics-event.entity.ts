import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Shop } from '../../shops/entities/shop.entity';

export enum EventType {
  // User Events
  USER_REGISTERED = 'user_registered',
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  USER_PROFILE_UPDATED = 'user_profile_updated',
  
  // Shop Events
  SHOP_CREATED = 'shop_created',
  SHOP_APPROVED = 'shop_approved',
  SHOP_SUSPENDED = 'shop_suspended',
  SHOP_VIEWED = 'shop_viewed',
  
  // Gem Events
  GEM_CREATED = 'gem_created',
  GEM_VIEWED = 'gem_viewed',
  GEM_LIKED = 'gem_liked',
  GEM_SHARED = 'gem_shared',
  GEM_ADDED_TO_WISHLIST = 'gem_added_to_wishlist',
  GEM_REMOVED_FROM_WISHLIST = 'gem_removed_from_wishlist',
  
  // Auction Events
  AUCTION_CREATED = 'auction_created',
  AUCTION_STARTED = 'auction_started',
  AUCTION_ENDED = 'auction_ended',
  AUCTION_VIEWED = 'auction_viewed',
  BID_PLACED = 'bid_placed',
  AUCTION_WON = 'auction_won',
  
  // Order Events
  ORDER_CREATED = 'order_created',
  ORDER_PAID = 'order_paid',
  ORDER_SHIPPED = 'order_shipped',
  ORDER_DELIVERED = 'order_delivered',
  ORDER_CANCELLED = 'order_cancelled',
  ORDER_REFUNDED = 'order_refunded',
  
  // Search Events
  SEARCH_PERFORMED = 'search_performed',
  FILTER_APPLIED = 'filter_applied',
  CATEGORY_BROWSED = 'category_browsed',
  
  // Review Events
  REVIEW_CREATED = 'review_created',
  REVIEW_HELPFUL_VOTED = 'review_helpful_voted',
  
  // Payment Events
  PAYMENT_INITIATED = 'payment_initiated',
  PAYMENT_COMPLETED = 'payment_completed',
  PAYMENT_FAILED = 'payment_failed',
  
  // Error Events
  ERROR_OCCURRED = 'error_occurred',
  PAGE_NOT_FOUND = 'page_not_found',
  
  // Performance Events
  PAGE_LOAD = 'page_load',
  API_CALL = 'api_call',
}

export enum EventCategory {
  USER = 'user',
  SHOP = 'shop',
  GEM = 'gem',
  AUCTION = 'auction',
  ORDER = 'order',
  SEARCH = 'search',
  REVIEW = 'review',
  PAYMENT = 'payment',
  ERROR = 'error',
  PERFORMANCE = 'performance',
}

@Entity('analytics_events')
@Index(['eventType'])
@Index(['eventCategory'])
@Index(['createdAt'])
@Index(['user'])
@Index(['shop'])
export class AnalyticsEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  eventType: EventType;

  @Column({
    type: 'enum',
    enum: EventCategory,
  })
  eventCategory: EventCategory;

  @Column()
  eventName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  properties: {
    gemId?: string;
    orderId?: string;
    auctionId?: string;
    bidId?: string;
    reviewId?: string;
    categoryId?: string;
    searchQuery?: string;
    filters?: any;
    amount?: number;
    currency?: string;
    page?: string;
    url?: string;
    referrer?: string;
    userAgent?: string;
    ipAddress?: string;
    duration?: number;
    error?: string;
    statusCode?: number;
    [key: string]: any;
  };

  @Column({ nullable: true })
  sessionId: string;

  @Column({ nullable: true })
  deviceType: string;

  @Column({ nullable: true })
  browser: string;

  @Column({ nullable: true })
  os: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  referrer: string;

  @Column({ nullable: true })
  utmSource: string;

  @Column({ nullable: true })
  utmMedium: string;

  @Column({ nullable: true })
  utmCampaign: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Shop, { nullable: true })
  @JoinColumn()
  shop: Shop;

  // Virtual fields
  get isUserEvent(): boolean {
    return this.eventCategory === EventCategory.USER;
  }

  get isShopEvent(): boolean {
    return this.eventCategory === EventCategory.SHOP;
  }

  get isAuctionEvent(): boolean {
    return this.eventCategory === EventCategory.AUCTION;
  }

  get isOrderEvent(): boolean {
    return this.eventCategory === EventCategory.ORDER;
  }

  get isRevenueEvent(): boolean {
    return [
      EventType.ORDER_PAID,
      EventType.PAYMENT_COMPLETED,
      EventType.AUCTION_WON,
    ].includes(this.eventType);
  }
}