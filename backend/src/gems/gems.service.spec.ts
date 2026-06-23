import { NotFoundException, ConflictException } from '@nestjs/common';
import { GemsService } from './gems.service';
import { GemStatus } from './entities/gem.entity';

function createMockRepo() {
  return {
    findOne: jest.fn(),
    create: jest.fn((x) => x),
    save: jest.fn((x) => Promise.resolve({ id: 'gem-1', ...x })),
    delete: jest.fn(),
    increment: jest.fn(),
    count: jest.fn(),
    createQueryBuilder: jest.fn(),
  };
}

describe('GemsService', () => {
  let service: GemsService;
  let repo: ReturnType<typeof createMockRepo>;

  beforeEach(() => {
    repo = createMockRepo();
    service = new GemsService(repo as any);
  });

  describe('create', () => {
    it('generates a unique slug and starts in PENDING / unapproved', async () => {
      repo.findOne.mockResolvedValue(null); // slug is free
      const result = await service.create({
        name: 'Ceylon Blue Sapphire',
        description: 'x',
        price: 100,
        weight: 1,
        cut: 'Oval',
        clarity: 'VVS1',
        color: 'Blue',
        origin: 'Sri Lanka',
        images: ['/a.jpg'],
        categoryId: 'cat-1',
        shopId: 'shop-1',
      } as any);

      expect(result.slug).toBe('ceylon-blue-sapphire');
      expect(result.status).toBe(GemStatus.PENDING);
      expect(result.isApproved).toBe(false);
      expect(result.mainImage).toBe('/a.jpg');
    });

    it('appends a counter when the slug already exists', async () => {
      repo.findOne
        .mockResolvedValueOnce({ id: 'existing' }) // base taken
        .mockResolvedValueOnce(null); // -1 free
      const result = await service.create({
        name: 'Ruby',
        description: 'x',
        price: 1,
        weight: 1,
        cut: 'c',
        clarity: 'c',
        color: 'c',
        origin: 'c',
        images: ['/a.jpg'],
        categoryId: 'cat',
        shopId: 'shop',
      } as any);
      expect(result.slug).toBe('ruby-1');
    });
  });

  describe('findOne', () => {
    it('throws NotFound when the gem is missing', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.findOne('nope')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findBySlug', () => {
    it('increments the view counter', async () => {
      repo.findOne.mockResolvedValue({ id: 'gem-1', views: 5 });
      const gem = await service.findBySlug('ceylon');
      expect(repo.increment).toHaveBeenCalledWith({ id: 'gem-1' }, 'views', 1);
      expect(gem.views).toBe(6);
    });
  });

  describe('approve', () => {
    it('rejects re-approving an already approved gem', async () => {
      repo.findOne.mockResolvedValue({ id: 'g', status: GemStatus.APPROVED });
      await expect(service.approve('g')).rejects.toThrow(ConflictException);
    });

    it('flips status and isApproved', async () => {
      repo.findOne.mockResolvedValue({ id: 'g', status: GemStatus.PENDING });
      const gem = await service.approve('g');
      expect(gem.status).toBe(GemStatus.APPROVED);
      expect(gem.isApproved).toBe(true);
    });
  });

  describe('remove', () => {
    it('throws NotFound when nothing was deleted', async () => {
      repo.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove('x')).rejects.toThrow(NotFoundException);
    });
  });
});
