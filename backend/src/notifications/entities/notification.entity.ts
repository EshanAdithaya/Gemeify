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

export enum NotificationType {
  BID_PLACED = 'bid_placed',
  BID_OUTBID = 'bid_outbid',
  AUCTION_WON = 'auction_won',
  AUCTION_LOST = 'auction_lost',
  AUCTION_ENDING = 'auction_ending',
  AUCTION_STARTED = 'auction_started',
  ORDER_PLACED = 'order_placed',
  ORDER_SHIPPED = 'order_shipped',
  ORDER_DELIVERED = 'order_delivered',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  SHOP_APPROVED = 'shop_approved',
  SHOP_REJECTED = 'shop_rejected',
  GEM_APPROVED = 'gem_approved',
  GEM_REJECTED = 'gem_rejected',
  REVIEW_RECEIVED = 'review_received',
  SYSTEM_ANNOUNCEMENT = 'system_announcement',
  SECURITY_ALERT = 'security_alert',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum NotificationStatus {
  UNREAD = 'unread',
  READ = 'read',
  ARCHIVED = 'archived',
}

@Entity('notifications')
@Index(['user', 'status'])
@Index(['type'])
@Index(['createdAt'])
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationPriority,
    default: NotificationPriority.MEDIUM,
  })
  priority: NotificationPriority;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.UNREAD,
  })
  status: NotificationStatus;

  @Column({ type: 'json', nullable: true })
  data: {
    auctionId?: string;
    orderId?: string;
    gemId?: string;
    shopId?: string;
    bidId?: string;
    amount?: number;
    url?: string;
    actionText?: string;
    [key: string]: any;
  };

  @Column({ nullable: true })
  actionUrl: string;

  @Column({ nullable: true })
  actionText: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  archivedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ default: false })
  isEmailSent: boolean;

  @Column({ default: false })
  isPushSent: boolean;

  @Column({ default: false })
  isSMSSent: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  // Virtual fields
  get isRead(): boolean {
    return this.status === NotificationStatus.READ;
  }

  get isUnread(): boolean {
    return this.status === NotificationStatus.UNREAD;
  }

  get isArchived(): boolean {
    return this.status === NotificationStatus.ARCHIVED;
  }

  get isExpired(): boolean {
    return this.expiresAt && new Date() > this.expiresAt;
  }

  get isUrgent(): boolean {
    return this.priority === NotificationPriority.URGENT;
  }
}