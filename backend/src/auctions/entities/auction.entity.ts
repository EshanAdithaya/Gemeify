import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Gem } from '../../gems/entities/gem.entity';
import { Shop } from '../../shops/entities/shop.entity';
import { Bid } from '../../bids/entities/bid.entity';

export enum AuctionStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  ENDED = 'ended',
  SOLD = 'sold',
  CANCELLED = 'cancelled',
}

export enum AuctionType {
  ENGLISH = 'english', // Traditional ascending bid auction
  DUTCH = 'dutch', // Descending price auction
  SEALED_BID = 'sealed_bid', // Sealed bid auction
  RESERVE = 'reserve', // Auction with reserve price
}

@Entity('auctions')
@Index(['status'])
@Index(['startTime'])
@Index(['endTime'])
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.DRAFT,
  })
  status: AuctionStatus;

  @Column({
    type: 'enum',
    enum: AuctionType,
    default: AuctionType.ENGLISH,
  })
  type: AuctionType;

  // Pricing
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  startingPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  reservePrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  currentBid: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 100 })
  minimumBidIncrement: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  buyNowPrice: number;

  // Timing
  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ default: false })
  autoExtend: boolean;

  @Column({ default: 5 })
  autoExtendMinutes: number;

  // Auction Settings
  @Column({ default: true })
  allowBuyNow: boolean;

  @Column({ default: false })
  requireApproval: boolean;

  @Column({ default: 0 })
  maxBidders: number;

  @Column({ type: 'json', nullable: true })
  eligibilityRules: {
    minAccountAge?: number;
    minVerificationLevel?: string;
    allowedCountries?: string[];
    excludedUsers?: string[];
  };

  // Results
  @Column({ nullable: true })
  winnerId: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  finalPrice: number;

  @Column({ type: 'timestamp', nullable: true })
  soldAt: Date;

  // Statistics
  @Column({ default: 0 })
  totalBids: number;

  @Column({ default: 0 })
  uniqueBidders: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  watchers: number;

  // Additional Information
  @Column({ type: 'json', nullable: true })
  terms: string[];

  @Column({ type: 'json', nullable: true })
  shippingInfo: {
    methods: string[];
    cost: number;
    freeThreshold?: number;
    estimatedDays: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Gem, (gem) => gem.auctions)
  @JoinColumn()
  gem: Gem;

  @ManyToOne(() => Shop)
  @JoinColumn()
  shop: Shop;

  @OneToMany(() => Bid, (bid) => bid.auction)
  bids: Bid[];

  // Virtual fields
  get isActive(): boolean {
    const now = new Date();
    return (
      this.status === AuctionStatus.LIVE &&
      now >= this.startTime &&
      now <= this.endTime
    );
  }

  get hasReserve(): boolean {
    return !!this.reservePrice && this.reservePrice > 0;
  }

  get isReserveMet(): boolean {
    return !this.hasReserve || this.currentBid >= this.reservePrice;
  }

  get timeRemaining(): number {
    const now = new Date().getTime();
    const end = this.endTime.getTime();
    return Math.max(0, end - now);
  }

  get hasEnded(): boolean {
    return new Date() > this.endTime || this.status === AuctionStatus.ENDED;
  }

  get nextMinBid(): number {
    return this.currentBid + this.minimumBidIncrement;
  }
}