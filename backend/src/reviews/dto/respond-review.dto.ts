import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RespondReviewDto {
  @ApiProperty({ example: 'Thank you for your kind words and trust!' })
  @IsString()
  response: string;
}
