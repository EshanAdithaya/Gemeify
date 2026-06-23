import { ConflictException, ForbiddenException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

function createReviewRepo() {
  return {
    findOne: jest.fn(),
    create: jest.fn((x) => x),
    save: jest.fn((x) => Promise.resolve({ id: 'r-1', ...x })),
    delete: jest.fn(),
    findAndCount: jest.fn(),
    createQueryBuilder: jest.fn(),
  };
}

function createGemRepo() {
  return {
    findOne: jest.fn(),
    update: jest.fn(),
  };
}

describe('ReviewsService', () => {
  let service: ReviewsService;
  let reviewRepo: ReturnType<typeof createReviewRepo>;
  let gemRepo: ReturnType<typeof createGemRepo>;

  beforeEach(() => {
    reviewRepo = createReviewRepo();
    gemRepo = createGemRepo();
    service = new ReviewsService(reviewRepo as any, gemRepo as any);
  });

  describe('create', () => {
    it('blocks a second review of the same gem by the same user', async () => {
      gemRepo.findOne.mockResolvedValue({ id: 'gem-1', shop: { id: 'shop-1' } });
      reviewRepo.findOne.mockResolvedValue({ id: 'existing' });
      await expect(
        service.create('user-1', {
          gemId: 'gem-1',
          rating: 5,
          title: 't',
          comment: 'c',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('recomputeGemRating', () => {
    it('writes the rounded average and count back onto the gem', async () => {
      reviewRepo.createQueryBuilder.mockReturnValue({
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ avg: '4.5', count: '2' }),
      });

      await service.recomputeGemRating('gem-1');
      expect(gemRepo.update).toHaveBeenCalledWith('gem-1', {
        rating: 4.5,
        totalReviews: 2,
      });
    });

    it('resets to zero when there are no approved reviews', async () => {
      reviewRepo.createQueryBuilder.mockReturnValue({
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ avg: null, count: '0' }),
      });

      await service.recomputeGemRating('gem-1');
      expect(gemRepo.update).toHaveBeenCalledWith('gem-1', {
        rating: 0,
        totalReviews: 0,
      });
    });
  });

  describe('remove', () => {
    it('forbids deleting a review the user does not own', async () => {
      reviewRepo.findOne.mockResolvedValue({
        id: 'r-1',
        user: { id: 'someone-else' },
        gem: { id: 'gem-1' },
      });
      await expect(service.remove('user-1', 'r-1')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
