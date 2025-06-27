import {
  IsString,
  IsEnum,
  IsOptional,
  IsObject,
  IsUUID,
  IsIP,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventType, EventCategory } from '../entities/analytics-event.entity';

export class TrackEventDto {
  @ApiProperty({ enum: EventType })
  @IsEnum(EventType)
  eventType: EventType;

  @ApiProperty({ enum: EventCategory })
  @IsEnum(EventCategory)
  eventCategory: EventCategory;

  @ApiProperty({ example: 'Gem Viewed' })
  @IsString()
  eventName: string;

  @ApiProperty({ required: false, example: 'User viewed a blue sapphire gem' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, type: Object })
  @IsOptional()
  @IsObject()
  properties?: {
    gemId?: string;
    orderId?: string;
    auctionId?: string;
    bidId?: string;
    reviewId?: string;
    categoryId?: string;
    searchQuery?: string;
    filters?: any;
    amount?: number;
    currency?: string;
    page?: string;
    url?: string;
    referrer?: string;
    userAgent?: string;
    ipAddress?: string;
    duration?: number;
    error?: string;
    statusCode?: number;
    [key: string]: any;
  };

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  shopId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deviceType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  browser?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  os?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIP()
  ipAddress?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  referrer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  utmSource?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  utmMedium?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  utmCampaign?: string;
}