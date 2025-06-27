import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationStatus, NotificationType, NotificationPriority } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User, UserStatus } from '../users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    console.log('🔔 Creating notification:', createNotificationDto);
    
    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      user: { id: createNotificationDto.userId },
    });

    const savedNotification = await this.notificationRepository.save(notification);
    console.log('✅ Notification created successfully:', savedNotification.id);
    
    return savedNotification;
  }

  async createBulk(notifications: CreateNotificationDto[]): Promise<Notification[]> {
    console.log(`🔔 Creating ${notifications.length} bulk notifications`);
    
    const notificationEntities = notifications.map(dto => 
      this.notificationRepository.create({
        ...dto,
        user: { id: dto.userId },
      })
    );

    const savedNotifications = await this.notificationRepository.save(notificationEntities);
    console.log(`✅ ${savedNotifications.length} notifications created successfully`);
    
    return savedNotifications;
  }

  async findUserNotifications(
    userId: string,
    page = 1,
    limit = 20,
    status?: NotificationStatus,
    type?: NotificationType,
  ) {
    console.log(`🔍 Finding notifications for user: ${userId}, page: ${page}, limit: ${limit}`);
    
    const queryBuilder = this.notificationRepository.createQueryBuilder('notification')
      .where('notification.userId = :userId', { userId })
      .orderBy('notification.createdAt', 'DESC');

    if (status) {
      queryBuilder.andWhere('notification.status = :status', { status });
    }

    if (type) {
      queryBuilder.andWhere('notification.type = :type', { type });
    }

    const [notifications, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    console.log(`📊 Found ${total} notifications for user ${userId}`);

    return {
      data: notifications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      unreadCount: await this.getUnreadCount(userId),
    };
  }

  async findOne(id: string, userId?: string): Promise<Notification> {
    console.log(`🔍 Finding notification: ${id}`);
    
    const query: any = { id };
    if (userId) {
      query.user = { id: userId };
    }

    const notification = await this.notificationRepository.findOne({
      where: query,
      relations: ['user'],
    });

    if (!notification) {
      console.log(`❌ Notification not found: ${id}`);
      throw new NotFoundException('Notification not found');
    }

    console.log(`✅ Found notification: ${notification.title}`);
    return notification;
  }

  async markAsRead(id: string, userId?: string): Promise<Notification> {
    console.log(`📖 Marking notification as read: ${id}`);
    
    const notification = await this.findOne(id, userId);
    
    if (notification.status !== NotificationStatus.READ) {
      notification.status = NotificationStatus.READ;
      notification.readAt = new Date();
      await this.notificationRepository.save(notification);
    }

    console.log(`✅ Notification marked as read: ${id}`);
    return notification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    console.log(`📖 Marking all notifications as read for user: ${userId}`);
    
    await this.notificationRepository.update(
      {
        user: { id: userId },
        status: NotificationStatus.UNREAD,
      },
      {
        status: NotificationStatus.READ,
        readAt: new Date(),
      }
    );

    console.log(`✅ All notifications marked as read for user: ${userId}`);
  }

  async archive(id: string, userId?: string): Promise<Notification> {
    console.log(`🗄️ Archiving notification: ${id}`);
    
    const notification = await this.findOne(id, userId);
    notification.status = NotificationStatus.ARCHIVED;
    notification.archivedAt = new Date();
    
    const archivedNotification = await this.notificationRepository.save(notification);
    console.log(`✅ Notification archived: ${id}`);
    
    return archivedNotification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto, userId?: string): Promise<Notification> {
    console.log(`🔄 Updating notification: ${id}`);
    
    const notification = await this.findOne(id, userId);
    Object.assign(notification, updateNotificationDto);
    
    const updatedNotification = await this.notificationRepository.save(notification);
    console.log(`✅ Notification updated: ${id}`);
    
    return updatedNotification;
  }

  async remove(id: string, userId?: string): Promise<void> {
    console.log(`🗑️ Deleting notification: ${id}`);
    
    const notification = await this.findOne(id, userId);
    await this.notificationRepository.remove(notification);
    
    console.log(`✅ Notification deleted: ${id}`);
  }

  async getUnreadCount(userId: string): Promise<number> {
    const count = await this.notificationRepository.count({
      where: {
        user: { id: userId },
        status: NotificationStatus.UNREAD,
      },
    });

    console.log(`📊 Unread notifications for user ${userId}: ${count}`);
    return count;
  }

  async getUserStats(userId: string) {
    console.log(`📊 Getting notification stats for user: ${userId}`);
    
    const [total, unread, read, archived] = await Promise.all([
      this.notificationRepository.count({ where: { user: { id: userId } } }),
      this.notificationRepository.count({ 
        where: { user: { id: userId }, status: NotificationStatus.UNREAD } 
      }),
      this.notificationRepository.count({ 
        where: { user: { id: userId }, status: NotificationStatus.READ } 
      }),
      this.notificationRepository.count({ 
        where: { user: { id: userId }, status: NotificationStatus.ARCHIVED } 
      }),
    ]);

    const stats = { total, unread, read, archived };
    console.log(`📊 Notification stats for user ${userId}:`, stats);
    
    return stats;
  }

  async cleanupExpiredNotifications(): Promise<number> {
    console.log('🧹 Cleaning up expired notifications');
    
    const result = await this.notificationRepository.delete({
      expiresAt: new Date(),
    });

    const deletedCount = result.affected || 0;
    console.log(`✅ Cleaned up ${deletedCount} expired notifications`);
    
    return deletedCount;
  }

  // Specific notification creation methods
  async createBidNotification(
    userId: string,
    auctionId: string,
    bidAmount: number,
    auctionTitle: string,
  ): Promise<Notification> {
    console.log(`🔔 Creating bid notification for user: ${userId}`);
    
    return this.create({
      type: NotificationType.BID_PLACED,
      title: 'New Bid Placed',
      message: `A new bid of $${bidAmount.toLocaleString()} has been placed on "${auctionTitle}"`,
      priority: NotificationPriority.HIGH,
      userId,
      data: { auctionId, amount: bidAmount },
      actionUrl: `/auctions/${auctionId}`,
      actionText: 'View Auction',
    });
  }

  async createAuctionWinNotification(
    userId: string,
    auctionId: string,
    finalAmount: number,
    auctionTitle: string,
  ): Promise<Notification> {
    console.log(`🏆 Creating auction win notification for user: ${userId}`);
    
    return this.create({
      type: NotificationType.AUCTION_WON,
      title: 'Congratulations! You Won!',
      message: `You won the auction "${auctionTitle}" for $${finalAmount.toLocaleString()}`,
      priority: NotificationPriority.URGENT,
      userId,
      data: { auctionId, amount: finalAmount },
      actionUrl: `/auctions/${auctionId}`,
      actionText: 'Complete Purchase',
    });
  }

  async createOrderNotification(
    userId: string,
    orderId: string,
    orderNumber: string,
    type: 'placed' | 'shipped' | 'delivered',
  ): Promise<Notification> {
    console.log(`📦 Creating order ${type} notification for user: ${userId}`);
    
    const notifications = {
      placed: {
        type: NotificationType.ORDER_PLACED,
        title: 'Order Confirmed',
        message: `Your order #${orderNumber} has been confirmed and is being processed`,
        priority: NotificationPriority.MEDIUM,
      },
      shipped: {
        type: NotificationType.ORDER_SHIPPED,
        title: 'Order Shipped',
        message: `Your order #${orderNumber} has been shipped and is on its way`,
        priority: NotificationPriority.MEDIUM,
      },
      delivered: {
        type: NotificationType.ORDER_DELIVERED,
        title: 'Order Delivered',
        message: `Your order #${orderNumber} has been delivered`,
        priority: NotificationPriority.LOW,
      },
    };

    const config = notifications[type];
    
    return this.create({
      type: config.type,
      title: config.title,
      message: config.message,
      priority: config.priority,
      userId,
      data: { orderId, orderNumber },
      actionUrl: `/orders/${orderId}`,
      actionText: 'View Order',
    });
  }

  async createSystemNotification(
    title: string,
    message: string,
    userIds?: string[],
    priority = NotificationPriority.MEDIUM,
  ): Promise<Notification[]> {
    console.log(`📢 Creating system notification: ${title}`);
    
    // If no specific users, send to all active users
    if (!userIds || userIds.length === 0) {
      const users = await this.userRepository.find({
        where: { status: UserStatus.ACTIVE },
        select: ['id'],
      });
      userIds = users.map(user => user.id);
    }

    const notifications = userIds.map(userId => ({
      type: NotificationType.SYSTEM_ANNOUNCEMENT,
      title,
      message,
      priority,
      userId,
    }));

    return this.createBulk(notifications);
  }
}