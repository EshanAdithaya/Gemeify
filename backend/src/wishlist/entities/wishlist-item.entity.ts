import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Gem } from '../../gems/entities/gem.entity';

@Entity('wishlist_items')
@Index(['user'])
@Index(['gem'])
@Unique(['user', 'gem'])
export class WishlistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, (user) => user.wishlistItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Gem, (gem) => gem.wishlistItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  gem: Gem;
}