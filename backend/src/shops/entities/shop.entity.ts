import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Gem } from '../../gems/entities/gem.entity';

export enum ShopStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
}

@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  banner: string;

  @Column({
    type: 'enum',
    enum: ShopStatus,
    default: ShopStatus.PENDING,
  })
  status: ShopStatus;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  // Business Information
  @Column({ nullable: true })
  businessLicense: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ type: 'json', nullable: true })
  bankDetails: {
    bankName?: string;
    accountNumber?: string;
    routingNumber?: string;
    accountHolderName?: string;
  };

  // Commission and Settings
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 10.00 })
  commissionRate: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  // Metrics
  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  totalReviews: number;

  @Column({ default: 0 })
  totalSales: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalRevenue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToOne(() => User, (user) => user.shop)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Gem, (gem) => gem.shop)
  gems: Gem[];

  // Virtual fields
  get isApproved(): boolean {
    return this.status === ShopStatus.APPROVED;
  }

  get averageRating(): number {
    return this.totalReviews > 0 ? this.rating : 0;
  }
}