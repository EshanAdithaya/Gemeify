import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  Order,
  OrderStatus,
  PaymentStatus,
} from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Gem, GemStatus } from '../gems/entities/gem.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserRole } from '../users/entities/user.entity';

const DEFAULT_COMMISSION_RATE = 10; // percent
const TAX_RATE = 0; // configurable; gemstones often tax-exempt in transit

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  private generateOrderNumber(): string {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `GEM-${ts}-${rand}`;
  }

  /**
   * Place an order atomically. Each gem row is locked for update so two
   * concurrent buyers can never oversell a limited stone.
   */
  async create(userId: string, dto: CreateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const orderItems: OrderItem[] = [];
      let subtotal = 0;

      for (const line of dto.items) {
        const gem = await manager
          .getRepository(Gem)
          .createQueryBuilder('gem')
          .leftJoinAndSelect('gem.shop', 'shop')
          .where('gem.id = :id', { id: line.gemId })
          .setLock('pessimistic_write')
          .getOne();

        if (!gem) {
          throw new NotFoundException(`Gem ${line.gemId} not found`);
        }
        if (gem.status !== GemStatus.APPROVED || !gem.isActive) {
          throw new BadRequestException(`Gem "${gem.name}" is not available for sale`);
        }
        if (gem.quantity < line.quantity) {
          throw new BadRequestException(
            `Only ${gem.quantity} of "${gem.name}" left in stock`,
          );
        }

        const unitPrice = Number(gem.price);
        const totalPrice = unitPrice * line.quantity;
        const commissionAmount = Number(
          ((totalPrice * DEFAULT_COMMISSION_RATE) / 100).toFixed(2),
        );

        const item = manager.getRepository(OrderItem).create({
          quantity: line.quantity,
          unitPrice,
          totalPrice,
          commissionRate: DEFAULT_COMMISSION_RATE,
          commissionAmount,
          vendorAmount: Number((totalPrice - commissionAmount).toFixed(2)),
          gem: { id: gem.id } as any,
          shop: gem.shop ? ({ id: gem.shop.id } as any) : null,
          gemSnapshot: {
            name: gem.name,
            description: gem.description,
            weight: Number(gem.weight),
            cut: gem.cut,
            clarity: gem.clarity,
            color: gem.color,
            origin: gem.origin,
            treatment: gem.treatment,
            certificationLab: gem.certificationLab,
            certificationNumber: gem.certificationNumber,
            images: gem.images,
            mainImage: gem.mainImage,
          },
        });

        // Decrement stock and mark sold-out gems.
        gem.quantity -= line.quantity;
        gem.totalSales = (gem.totalSales || 0) + line.quantity;
        if (gem.quantity <= 0) gem.status = GemStatus.SOLD;
        await manager.getRepository(Gem).save(gem);

        orderItems.push(item);
        subtotal += totalPrice;
      }

      const tax = Number(((subtotal * TAX_RATE) / 100).toFixed(2));
      const total = Number((subtotal + tax).toFixed(2));

      const order = manager.getRepository(Order).create({
        orderNumber: this.generateOrderNumber(),
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        paymentMethod: dto.paymentMethod,
        subtotal: Number(subtotal.toFixed(2)),
        tax,
        total,
        shippingAddress: dto.shippingAddress,
        customerNotes: dto.customerNotes,
        statusHistory: [{ status: OrderStatus.PENDING, timestamp: new Date() }],
        user: { id: userId } as any,
        items: orderItems,
      });

      return manager.getRepository(Order).save(order);
    });
  }

  async findForUser(userId: string, page = 1, limit = 10) {
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string, userId: string, role: UserRole): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.gem'],
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    const isOwner = order.user?.id === userId;
    const isStaff =
      role === UserRole.SUPER_ADMIN || role === UserRole.SHOP_ADMIN;
    if (!isOwner && !isStaff) {
      throw new ForbiddenException('You cannot view this order');
    }
    return order;
  }

  async updateStatus(id: string, status: OrderStatus, note?: string): Promise<Order> {
    if (!Object.values(OrderStatus).includes(status)) {
      throw new BadRequestException(`Invalid order status: ${status}`);
    }
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    order.status = status;
    order.statusHistory = [
      ...(order.statusHistory || []),
      { status, timestamp: new Date(), note },
    ];
    if (status === OrderStatus.SHIPPED) order.shippedAt = new Date();
    if (status === OrderStatus.DELIVERED) order.deliveredAt = new Date();
    return this.orderRepository.save(order);
  }

  /** Cancel an order and return stock to inventory. */
  async cancel(id: string, userId: string): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.getRepository(Order).findOne({
        where: { id },
        relations: ['user', 'items', 'items.gem'],
      });
      if (!order) throw new NotFoundException(`Order ${id} not found`);
      if (order.user?.id !== userId) {
        throw new ForbiddenException('You cannot cancel this order');
      }
      if (!order.canBeCancelled) {
        throw new BadRequestException(
          `Order in status "${order.status}" can no longer be cancelled`,
        );
      }

      for (const item of order.items) {
        if (item.gem) {
          const gem = await manager.getRepository(Gem).findOne({
            where: { id: item.gem.id },
          });
          if (gem) {
            gem.quantity += item.quantity;
            gem.totalSales = Math.max(0, (gem.totalSales || 0) - item.quantity);
            if (gem.status === GemStatus.SOLD && gem.quantity > 0) {
              gem.status = GemStatus.APPROVED;
            }
            await manager.getRepository(Gem).save(gem);
          }
        }
      }

      order.status = OrderStatus.CANCELLED;
      order.statusHistory = [
        ...(order.statusHistory || []),
        { status: OrderStatus.CANCELLED, timestamp: new Date() },
      ];
      return manager.getRepository(Order).save(order);
    });
  }
}
