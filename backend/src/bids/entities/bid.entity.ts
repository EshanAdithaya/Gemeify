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
import { Auction } from '../../auctions/entities/auction.entity';

export enum BidStatus {
  ACTIVE = 'active',
  OUTBID = 'outbid',
  WINNING = 'winning',
  WON = 'won',
  LOST = 'lost',
  CANCELLED = 'cancelled',
}

@Entity('bids')
@Index(['auction', 'amount'])
@Index(['auction', 'createdAt'])
@Index(['user'])
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: BidStatus,
    default: BidStatus.ACTIVE,
  })
  status: BidStatus;

  @Column({ default: false })
  isAutoBid: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  maxAutoBidAmount: number;

  @Column({ nullable: true })
  bidderIp: string;

  @Column({ nullable: true })
  userAgent: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.bids)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Auction, (auction) => auction.bids)
  @JoinColumn()
  auction: Auction;

  // Virtual fields
  get isWinning(): boolean {
    return this.status === BidStatus.WINNING;
  }

  get isActive(): boolean {
    return [BidStatus.ACTIVE, BidStatus.WINNING].includes(this.status);
  }
}