import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderStatus } from './entities/order.entity';

function createOrderRepo() {
  return {
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    save: jest.fn((x) => Promise.resolve(x)),
  };
}

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepo: ReturnType<typeof createOrderRepo>;

  beforeEach(() => {
    orderRepo = createOrderRepo();
    service = new OrdersService(orderRepo as any, {} as any);
  });

  describe('updateStatus', () => {
    it('rejects an invalid status value', async () => {
      await expect(
        service.updateStatus('o-1', 'not-a-status' as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws NotFound when the order does not exist', async () => {
      orderRepo.findOne.mockResolvedValue(null);
      await expect(
        service.updateStatus('o-1', OrderStatus.SHIPPED),
      ).rejects.toThrow(NotFoundException);
    });

    it('appends to status history and stamps shippedAt on SHIPPED', async () => {
      orderRepo.findOne.mockResolvedValue({
        id: 'o-1',
        statusHistory: [],
      });
      const order = await service.updateStatus('o-1', OrderStatus.SHIPPED, 'on its way');
      expect(order.status).toBe(OrderStatus.SHIPPED);
      expect(order.shippedAt).toBeInstanceOf(Date);
      expect(order.statusHistory).toHaveLength(1);
      expect(order.statusHistory[0].note).toBe('on its way');
    });
  });

  describe('generateOrderNumber', () => {
    it('produces a GEM-prefixed unique-looking number', () => {
      const n = (service as any).generateOrderNumber();
      expect(n).toMatch(/^GEM-[A-Z0-9]+-[A-Z0-9]{4}$/);
    });
  });
});
