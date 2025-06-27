import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Gem } from '../../gems/entities/gem.entity';
import { Shop } from '../../shops/entities/shop.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalPrice: number;

  // Commission calculation
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  commissionRate: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  commissionAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  vendorAmount: number;

  // Product snapshot at time of purchase
  @Column({ type: 'json' })
  gemSnapshot: {
    name: string;
    description: string;
    weight: number;
    cut: string;
    clarity: string;
    color: string;
    origin: string;
    treatment?: string;
    certificationLab?: string;
    certificationNumber?: string;
    images: string[];
    mainImage: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Gem, (gem) => gem.orderItems)
  @JoinColumn()
  gem: Gem;

  @ManyToOne(() => Shop)
  @JoinColumn()
  shop: Shop;

  // Virtual fields
  get subtotal(): number {
    return this.quantity * this.unitPrice;
  }
}