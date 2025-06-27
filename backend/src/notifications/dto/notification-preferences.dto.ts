import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationPreferencesDto {
  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  pushNotifications?: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  smsNotifications?: boolean;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  auctionNotifications?: boolean;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  orderNotifications?: boolean;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  securityNotifications?: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  marketingNotifications?: boolean;
}