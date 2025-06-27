import { IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlaceBidDto {
  @ApiProperty({ example: 1500, description: 'Bid amount in USD' })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ default: false, description: 'Is this an automatic bid' })
  @IsOptional()
  @IsBoolean()
  isAutoBid?: boolean;

  @ApiProperty({ required: false, example: 2000, description: 'Maximum auto bid amount' })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  maxAutoBidAmount?: number;
}