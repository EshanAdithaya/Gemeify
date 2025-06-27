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
import { Gem } from '../../gems/entities/gem.entity';
import { Shop } from '../../shops/entities/shop.entity';

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FLAGGED = 'flagged',
}

@Entity('reviews')
@Index(['gem'])
@Index(['shop'])
@Index(['user'])
@Index(['rating'])
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', width: 1 })
  rating: number; // 1-5 stars

  @Column()
  title: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.PENDING,
  })
  status: ReviewStatus;

  @Column({ type: 'json', nullable: true })
  images: string[];

  @Column({ default: false })
  isVerifiedPurchase: boolean;

  // Helpful votes
  @Column({ default: 0 })
  helpfulVotes: number;

  @Column({ default: 0 })
  notHelpfulVotes: number;

  // Response from shop owner
  @Column({ type: 'text', nullable: true })
  shopResponse: string;

  @Column({ type: 'timestamp', nullable: true })
  shopResponseAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Gem, (gem) => gem.reviews)
  @JoinColumn()
  gem: Gem;

  @ManyToOne(() => Shop)
  @JoinColumn()
  shop: Shop;

  // Virtual fields
  get isApproved(): boolean {
    return this.status === ReviewStatus.APPROVED;
  }

  get helpfulnessRatio(): number {
    const total = this.helpfulVotes + this.notHelpfulVotes;
    return total > 0 ? this.helpfulVotes / total : 0;
  }
}