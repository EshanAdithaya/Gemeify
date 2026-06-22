import { NotFoundException } from '@nestjs/common';
import { WishlistService } from './wishlist.service';

function createMockRepo() {
  return {
    findOne: jest.fn(),
    create: jest.fn((x) => x),
    save: jest.fn((x) => Promise.resolve({ id: 'w-1', ...x })),
    delete: jest.fn(),
    findAndCount: jest.fn(),
    count: jest.fn(),
  };
}

describe('WishlistService', () => {
  let service: WishlistService;
  let repo: ReturnType<typeof createMockRepo>;

  beforeEach(() => {
    repo = createMockRepo();
    service = new WishlistService(repo as any);
  });

  describe('add (idempotency)', () => {
    it('returns the existing item without inserting a duplicate', async () => {
      const existing = { id: 'w-1' };
      repo.findOne.mockResolvedValue(existing);
      const result = await service.add('user-1', 'gem-1');
      expect(result).toBe(existing);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('creates a new item when not already saved', async () => {
      repo.findOne.mockResolvedValue(null);
      await service.add('user-1', 'gem-1');
      expect(repo.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('throws NotFound when the gem was not in the wishlist', async () => {
      repo.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove('user-1', 'gem-1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('has', () => {
    it('returns true when a matching row exists', async () => {
      repo.count.mockResolvedValue(1);
      expect(await service.has('user-1', 'gem-1')).toBe(true);
    });

    it('returns false when no row exists', async () => {
      repo.count.mockResolvedValue(0);
      expect(await service.has('user-1', 'gem-1')).toBe(false);
    });
  });
});
