import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Gem } from '../../gems/entities/gem.entity';

@Entity('categories')
@Tree('nested-set')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  // SEO fields
  @Column({ nullable: true })
  metaTitle: string;

  @Column({ type: 'text', nullable: true })
  metaDescription: string;

  @Column({ type: 'json', nullable: true })
  metaKeywords: string[];

  // Statistics
  @Column({ default: 0 })
  gemCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Tree relationships
  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  // Gem relationship
  @OneToMany(() => Gem, (gem) => gem.category)
  gems: Gem[];

  // Virtual fields
  get hasChildren(): boolean {
    return this.children && this.children.length > 0;
  }

  get isParent(): boolean {
    return !this.parent;
  }
}