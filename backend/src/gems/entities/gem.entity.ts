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
import { Shop } from '../../shops/entities/shop.entity';
import { Category } from '../../categories/entities/category.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { Review } from '../../reviews/entities/review.entity';
import { WishlistItem } from '../../wishlist/entities/wishlist-item.entity';
import { Auction } from '../../auctions/entities/auction.entity';

export enum GemStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SOLD = 'sold',
  INACTIVE = 'inactive',
}

export enum GemCondition {
  NEW = 'new',
  EXCELLENT = 'excellent',
  VERY_GOOD = 'very_good',
  GOOD = 'good',
  FAIR = 'fair',
}

export enum CertificationLab {
  GIA = 'GIA',
  IGI = 'IGI',
  AGS = 'AGS',
  GRS = 'GRS',
  GUBELIN = 'Gubelin',
  SSEF = 'SSEF',
  AGL = 'AGL',
  LOTUS = 'Lotus',
}

@Entity('gems')
@Index(['status', 'isApproved'])
@Index(['price'])
@Index(['createdAt'])
export class Gem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  originalPrice: number;

  @Column({
    type: 'enum',
    enum: GemStatus,
    default: GemStatus.DRAFT,
  })
  status: GemStatus;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isAuctionItem: boolean;

  // Gem Properties
  @Column({ type: 'decimal', precision: 8, scale: 3 })
  weight: number;

  @Column()
  cut: string;

  @Column()
  clarity: string;

  @Column()
  color: string;

  @Column()
  origin: string;

  @Column({ nullable: true })
  treatment: string;

  @Column({
    type: 'enum',
    enum: GemCondition,
    default: GemCondition.NEW,
  })
  condition: GemCondition;

  // Certification
  @Column({
    type: 'enum',
    enum: CertificationLab,
    nullable: true,
  })
  certificationLab: CertificationLab;

  @Column({ nullable: true })
  certificationNumber: string;

  @Column({ nullable: true })
  certificationFile: string;

  // Images and Media
  @Column({ type: 'json' })
  images: string[];

  @Column({ nullable: true })
  mainImage: string;

  @Column({ type: 'json', nullable: true })
  videos: string[];

  @Column({ type: 'json', nullable: true })
  documents: string[];

  // Dimensions
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  length: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  width: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  depth: number;

  // Inventory
  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 1 })
  minOrderQuantity: number;

  @Column({ nullable: true })
  sku: string;

  // SEO and Marketing
  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({ nullable: true })
  metaTitle: string;

  @Column({ type: 'text', nullable: true })
  metaDescription: string;

  // Metrics
  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  totalReviews: number;

  @Column({ default: 0 })
  totalSales: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Shop, (shop) => shop.gems)
  @JoinColumn()
  shop: Shop;

  @ManyToOne(() => Category, (category) => category.gems)
  @JoinColumn()
  category: Category;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.gem)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.gem)
  reviews: Review[];

  @OneToMany(() => WishlistItem, (item) => item.gem)
  wishlistItems: WishlistItem[];

  @OneToMany(() => Auction, (auction) => auction.gem)
  auctions: Auction[];

  // Virtual fields
  get isAvailable(): boolean {
    return (
      this.status === GemStatus.APPROVED &&
      this.isApproved &&
      this.isActive &&
      this.quantity > 0
    );
  }

  get discountPercentage(): number {
    if (this.originalPrice && this.originalPrice > this.price) {
      return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
    }
    return 0;
  }

  get averageRating(): number {
    return this.totalReviews > 0 ? this.rating : 0;
  }

  get isSoldOut(): boolean {
    return this.quantity <= 0;
  }
}