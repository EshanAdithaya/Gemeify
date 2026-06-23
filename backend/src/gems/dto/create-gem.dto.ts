import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsArray,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GemCondition, CertificationLab } from '../entities/gem.entity';

export class CreateGemDto {
  @ApiProperty({ example: 'Ceylon Blue Sapphire' })
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiProperty({ example: 'A vivid royal-blue sapphire from Ratnapura, Sri Lanka.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 4500, description: 'Selling price in USD' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ required: false, example: 5200, description: 'Original price for discount display' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  originalPrice?: number;

  @ApiProperty({ example: 5.25, description: 'Weight in carats' })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({ example: 'Oval' })
  @IsString()
  cut: string;

  @ApiProperty({ example: 'VVS1' })
  @IsString()
  clarity: string;

  @ApiProperty({ example: 'Royal Blue' })
  @IsString()
  color: string;

  @ApiProperty({ example: 'Sri Lanka' })
  @IsString()
  origin: string;

  @ApiProperty({ required: false, example: 'Heated' })
  @IsOptional()
  @IsString()
  treatment?: string;

  @ApiProperty({ required: false, enum: GemCondition, default: GemCondition.NEW })
  @IsOptional()
  @IsEnum(GemCondition)
  condition?: GemCondition;

  @ApiProperty({ required: false, enum: CertificationLab })
  @IsOptional()
  @IsEnum(CertificationLab)
  certificationLab?: CertificationLab;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  certificationNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  certificationFile?: string;

  @ApiProperty({ type: [String], example: ['/uploads/sapphire-1.jpg'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mainImage?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: string[];

  @ApiProperty({ required: false, example: 7.2, description: 'Length in mm' })
  @IsOptional()
  @IsNumber()
  length?: number;

  @ApiProperty({ required: false, example: 5.4, description: 'Width in mm' })
  @IsOptional()
  @IsNumber()
  width?: number;

  @ApiProperty({ required: false, example: 3.1, description: 'Depth in mm' })
  @IsOptional()
  @IsNumber()
  depth?: number;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isAuctionItem?: boolean;

  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: 'uuid-of-shop' })
  @IsUUID()
  shopId: string;
}
