import {
  IsString,
  IsEnum,
  IsOptional,
  IsObject,
  IsDateString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType, NotificationPriority } from '../entities/notification.entity';

export class CreateNotificationDto {
  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({ example: 'New Bid Placed' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A new bid of $1,500 has been placed on your auction' })
  @IsString()
  message: string;

  @ApiProperty({ enum: NotificationPriority, required: false })
  @IsOptional()
  @IsEnum(NotificationPriority)
  priority?: NotificationPriority;

  @ApiProperty({ required: false, type: Object })
  @IsOptional()
  @IsObject()
  data?: {
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

  @ApiProperty({ required: false, example: '/auctions/123' })
  @IsOptional()
  @IsString()
  actionUrl?: string;

  @ApiProperty({ required: false, example: 'View Auction' })
  @IsOptional()
  @IsString()
  actionText?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({ example: 'user-uuid' })
  @IsUUID()
  userId: string;
}