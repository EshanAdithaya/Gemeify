import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from 'typeorm';

@Entity('daily_stats')
@Index(['date'])
@Index(['shopId'])
@Unique(['date', 'shopId'])
export class DailyStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  shopId: string;

  // User Metrics
  @Column({ default: 0 })
  newUsers: number;

  @Column({ default: 0 })
  activeUsers: number;

  @Column({ default: 0 })
  userLogins: number;

  @Column({ default: 0 })
  userRegistrations: number;

  // Gem Metrics
  @Column({ default: 0 })
  gemsCreated: number;

  @Column({ default: 0 })
  gemsViewed: number;

  @Column({ default: 0 })
  gemsLiked: number;

  @Column({ default: 0 })
  gemsShared: number;

  @Column({ default: 0 })
  gemsAddedToWishlist: number;

  // Auction Metrics
  @Column({ default: 0 })
  auctionsCreated: number;

  @Column({ default: 0 })
  auctionsStarted: number;

  @Column({ default: 0 })
  auctionsEnded: number;

  @Column({ default: 0 })
  auctionsViewed: number;

  @Column({ default: 0 })
  bidsPlaced: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalBidAmount: number;

  @Column({ default: 0 })
  auctionsWon: number;

  // Order Metrics
  @Column({ default: 0 })
  ordersCreated: number;

  @Column({ default: 0 })
  ordersPaid: number;

  @Column({ default: 0 })
  ordersShipped: number;

  @Column({ default: 0 })
  ordersDelivered: number;

  @Column({ default: 0 })
  ordersCancelled: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalRevenue: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalCommission: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  averageOrderValue: number;

  // Review Metrics
  @Column({ default: 0 })
  reviewsCreated: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  averageRating: number;

  // Search Metrics
  @Column({ default: 0 })
  searchesPerformed: number;

  @Column({ default: 0 })
  filtersApplied: number;

  @Column({ default: 0 })
  categoriesBrowsed: number;

  // Payment Metrics
  @Column({ default: 0 })
  paymentsInitiated: number;

  @Column({ default: 0 })
  paymentsCompleted: number;

  @Column({ default: 0 })
  paymentsFailed: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  paymentSuccessRate: number;

  // Traffic Metrics
  @Column({ default: 0 })
  pageViews: number;

  @Column({ default: 0 })
  uniqueVisitors: number;

  @Column({ default: 0 })
  sessions: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, default: 0 })
  averageSessionDuration: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  bounceRate: number;

  // Error Metrics
  @Column({ default: 0 })
  errorsOccurred: number;

  @Column({ default: 0 })
  pageNotFoundErrors: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  errorRate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields
  get conversionRate(): number {
    return this.pageViews > 0 ? (this.ordersPaid / this.pageViews) * 100 : 0;
  }

  get userRetentionRate(): number {
    return this.newUsers > 0 ? (this.activeUsers / this.newUsers) * 100 : 0;
  }

  get auctionSuccessRate(): number {
    return this.auctionsEnded > 0 ? (this.auctionsWon / this.auctionsEnded) * 100 : 0;
  }

  get isShopSpecific(): boolean {
    return !!this.shopId;
  }

  get isGlobalStats(): boolean {
    return !this.shopId;
  }
}