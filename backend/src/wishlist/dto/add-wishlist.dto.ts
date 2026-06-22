import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddWishlistDto {
  @ApiProperty({ example: 'uuid-of-gem', description: 'Gem to add to the wishlist' })
  @IsUUID()
  gemId: string;
}
