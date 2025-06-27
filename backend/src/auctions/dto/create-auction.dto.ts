import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsArray,
  ValidateNested,
  Min,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AuctionType } from '../entities/auction.entity';

class EligibilityRulesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minAccountAge?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  minVerificationLevel?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedCountries?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excludedUsers?: string[];
}

class ShippingInfoDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  methods: string[];

  @ApiProperty()
  @IsNumber()
  cost: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  freeThreshold?: number;

  @ApiProperty()
  @IsNumber()
  estimatedDays: number;
}

export class CreateAuctionDto {
  @ApiProperty({ example: 'Rare Blue Sapphire Auction' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A stunning 5-carat blue sapphire from Ceylon' })
  @IsString()
  description: string;

  @ApiProperty({ enum: AuctionType, default: AuctionType.ENGLISH })
  @IsEnum(AuctionType)
  type: AuctionType;

  @ApiProperty({ example: 1000, description: 'Starting price in USD' })
  @IsNumber()
  @Min(0)
  startingPrice: number;

  @ApiProperty({ required: false, example: 5000, description: 'Reserve price in USD' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reservePrice?: number;

  @ApiProperty({ example: 100, description: 'Minimum bid increment in USD' })
  @IsNumber()
  @Min(1)
  minimumBidIncrement: number;

  @ApiProperty({ required: false, example: 10000, description: 'Buy now price in USD' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  buyNowPrice?: number;

  @ApiProperty({ example: '2024-12-01T10:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ example: '2024-12-08T10:00:00Z' })
  @IsDateString()
  endTime: string;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  autoExtend?: boolean;

  @ApiProperty({ default: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  autoExtendMinutes?: number;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  allowBuyNow?: boolean;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  requireApproval?: boolean;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxBidders?: number;

  @ApiProperty({ required: false, type: EligibilityRulesDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => EligibilityRulesDto)
  eligibilityRules?: EligibilityRulesDto;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  terms?: string[];

  @ApiProperty({ required: false, type: ShippingInfoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingInfoDto)
  shippingInfo?: ShippingInfoDto;

  @ApiProperty({ example: 'uuid-of-gem' })
  @IsUUID()
  gemId: string;

  @ApiProperty({ example: 'uuid-of-shop' })
  @IsUUID()
  shopId: string;
}