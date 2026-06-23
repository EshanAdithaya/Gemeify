import {
  IsString,
  IsInt,
  Min,
  Max,
  IsUUID,
  IsOptional,
  IsArray,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'uuid-of-gem' })
  @IsUUID()
  gemId: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Stunning colour in person' })
  @IsString()
  @MaxLength(150)
  title: string;

  @ApiProperty({ example: 'The sapphire exceeded my expectations — vivid and well cut.' })
  @IsString()
  comment: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
