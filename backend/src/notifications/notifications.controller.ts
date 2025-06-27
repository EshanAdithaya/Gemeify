import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { NotificationStatus, NotificationType } from './entities/notification.entity';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Create notification (Admin only)' })
  @ApiResponse({ status: 201, description: 'Notification created successfully' })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    console.log(`🔔 Creating notification by admin`);
    const notification = await this.notificationsService.create(createNotificationDto);
    return {
      message: 'Notification created successfully',
      data: { notification },
    };
  }

  @Get('my-notifications')
  @ApiOperation({ summary: 'Get my notifications' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiQuery({ name: 'status', required: false, enum: NotificationStatus })
  @ApiQuery({ name: 'type', required: false, enum: NotificationType })
  async getMyNotifications(
    @Request() req: any,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: NotificationStatus,
    @Query('type') type?: NotificationType,
  ) {
    console.log(`🔍 Getting notifications for user: ${req.user.id}`);
    const result = await this.notificationsService.findUserNotifications(
      req.user.id,
      +page,
      +limit,
      status,
      type,
    );
    return {
      message: 'Notifications retrieved successfully',
      data: result,
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get notification statistics' })
  async getStats(@Request() req: any) {
    console.log(`📊 Getting notification stats for user: ${req.user.id}`);
    const stats = await this.notificationsService.getUserStats(req.user.id);
    return {
      message: 'Notification statistics retrieved successfully',
      data: stats,
    };
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notification count' })
  async getUnreadCount(@Request() req: any) {
    console.log(`📊 Getting unread count for user: ${req.user.id}`);
    const count = await this.notificationsService.getUnreadCount(req.user.id);
    return {
      message: 'Unread count retrieved successfully',
      data: { count },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async findOne(@Param('id') id: string, @Request() req: any) {
    console.log(`🔍 Getting notification: ${id} for user: ${req.user.id}`);
    const notification = await this.notificationsService.findOne(id, req.user.id);
    return {
      message: 'Notification retrieved successfully',
      data: { notification },
    };
  }

  @Patch('mark-all-read')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllAsRead(@Request() req: any) {
    console.log(`📖 Marking all notifications as read for user: ${req.user.id}`);
    await this.notificationsService.markAllAsRead(req.user.id);
    return {
      message: 'All notifications marked as read',
    };
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@Param('id') id: string, @Request() req: any) {
    console.log(`📖 Marking notification as read: ${id}`);
    const notification = await this.notificationsService.markAsRead(id, req.user.id);
    return {
      message: 'Notification marked as read',
      data: { notification },
    };
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive notification' })
  async archive(@Param('id') id: string, @Request() req: any) {
    console.log(`🗄️ Archiving notification: ${id}`);
    const notification = await this.notificationsService.archive(id, req.user.id);
    return {
      message: 'Notification archived',
      data: { notification },
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update notification' })
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Request() req: any,
  ) {
    console.log(`🔄 Updating notification: ${id}`);
    const notification = await this.notificationsService.update(
      id,
      updateNotificationDto,
      req.user.id,
    );
    return {
      message: 'Notification updated successfully',
      data: { notification },
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  async remove(@Param('id') id: string, @Request() req: any) {
    console.log(`🗑️ Deleting notification: ${id}`);
    await this.notificationsService.remove(id, req.user.id);
    return {
      message: 'Notification deleted successfully',
    };
  }

  @Post('system-announcement')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create system announcement (Super Admin only)' })
  async createSystemAnnouncement(
    @Body() body: { title: string; message: string; userIds?: string[] },
  ) {
    console.log(`📢 Creating system announcement: ${body.title}`);
    const notifications = await this.notificationsService.createSystemNotification(
      body.title,
      body.message,
      body.userIds,
    );
    return {
      message: 'System announcement created successfully',
      data: { count: notifications.length },
    };
  }

  @Post('cleanup-expired')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Cleanup expired notifications (Super Admin only)' })
  async cleanupExpired() {
    console.log(`🧹 Cleaning up expired notifications`);
    const deletedCount = await this.notificationsService.cleanupExpiredNotifications();
    return {
      message: 'Expired notifications cleaned up',
      data: { deletedCount },
    };
  }
}