import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Between } from 'typeorm';
import { Auction, AuctionStatus, AuctionType } from './entities/auction.entity';
import { Bid, BidStatus } from '../bids/entities/bid.entity';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { PlaceBidDto } from './dto/place-bid.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: Repository<Auction>,
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
  ) {}

  async create(createAuctionDto: CreateAuctionDto, userId: string): Promise<Auction> {
    console.log('🏛️ Creating new auction:', createAuctionDto);
    
    const auction = this.auctionRepository.create({
      ...createAuctionDto,
      shop: { id: createAuctionDto.shopId },
      gem: { id: createAuctionDto.gemId },
      currentBid: createAuctionDto.startingPrice,
    });

    const savedAuction = await this.auctionRepository.save(auction);
    console.log('✅ Auction created successfully:', savedAuction.id);
    
    return savedAuction;
  }

  async findAll(
    page = 1,
    limit = 10,
    status?: AuctionStatus,
    type?: AuctionType,
  ) {
    console.log(`🔍 Finding auctions - Page: ${page}, Limit: ${limit}, Status: ${status}, Type: ${type}`);
    
    const queryBuilder = this.auctionRepository.createQueryBuilder('auction')
      .leftJoinAndSelect('auction.gem', 'gem')
      .leftJoinAndSelect('auction.shop', 'shop')
      .leftJoinAndSelect('auction.bids', 'bids')
      .orderBy('auction.createdAt', 'DESC');

    if (status) {
      queryBuilder.andWhere('auction.status = :status', { status });
    }

    if (type) {
      queryBuilder.andWhere('auction.type = :type', { type });
    }

    const [auctions, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    console.log(`📊 Found ${total} auctions, returning ${auctions.length} for current page`);

    return {
      data: auctions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findLive() {
    console.log('🔴 Finding live auctions');
    
    const now = new Date();
    const liveAuctions = await this.auctionRepository.find({
      where: {
        status: AuctionStatus.LIVE,
        startTime: LessThan(now),
        endTime: MoreThan(now),
      },
      relations: ['gem', 'shop', 'bids'],
      order: { endTime: 'ASC' },
    });

    console.log(`🔴 Found ${liveAuctions.length} live auctions`);
    return liveAuctions;
  }

  async findUpcoming() {
    console.log('⏰ Finding upcoming auctions');
    
    const now = new Date();
    const upcomingAuctions = await this.auctionRepository.find({
      where: [
        { status: AuctionStatus.SCHEDULED, startTime: MoreThan(now) },
        { status: AuctionStatus.DRAFT },
      ],
      relations: ['gem', 'shop'],
      order: { startTime: 'ASC' },
    });

    console.log(`⏰ Found ${upcomingAuctions.length} upcoming auctions`);
    return upcomingAuctions;
  }

  async findOne(id: string): Promise<Auction> {
    console.log(`🔍 Finding auction by ID: ${id}`);
    
    const auction = await this.auctionRepository.findOne({
      where: { id },
      relations: ['gem', 'shop', 'bids', 'bids.user'],
      order: {
        bids: {
          createdAt: 'DESC',
        },
      },
    });

    if (!auction) {
      console.log(`❌ Auction not found: ${id}`);
      throw new NotFoundException('Auction not found');
    }

    console.log(`✅ Found auction: ${auction.title}`);
    return auction;
  }

  async update(id: string, updateAuctionDto: UpdateAuctionDto): Promise<Auction> {
    console.log(`🔄 Updating auction ${id}:`, updateAuctionDto);
    
    const auction = await this.findOne(id);
    
    // Prevent updates to live auctions
    if (auction.status === AuctionStatus.LIVE) {
      throw new BadRequestException('Cannot update live auction');
    }

    Object.assign(auction, updateAuctionDto);
    const updatedAuction = await this.auctionRepository.save(auction);
    
    console.log(`✅ Auction updated successfully: ${id}`);
    return updatedAuction;
  }

  async remove(id: string): Promise<void> {
    console.log(`🗑️ Deleting auction: ${id}`);
    
    const auction = await this.findOne(id);
    
    // Prevent deletion of live auctions with bids
    if (auction.status === AuctionStatus.LIVE && auction.totalBids > 0) {
      throw new BadRequestException('Cannot delete live auction with bids');
    }

    await this.auctionRepository.remove(auction);
    console.log(`✅ Auction deleted successfully: ${id}`);
  }

  async placeBid(auctionId: string, placeBidDto: PlaceBidDto, userId: string): Promise<Bid> {
    console.log(`💰 Placing bid on auction ${auctionId}:`, placeBidDto);
    
    const auction = await this.findOne(auctionId);

    // Validate auction status
    if (!auction.isActive) {
      throw new BadRequestException('Auction is not active');
    }

    // Validate bid amount
    if (placeBidDto.amount <= auction.currentBid) {
      throw new BadRequestException(
        `Bid amount must be higher than current bid of $${auction.currentBid}`
      );
    }

    if (placeBidDto.amount < auction.nextMinBid) {
      throw new BadRequestException(
        `Minimum bid amount is $${auction.nextMinBid}`
      );
    }

    // Check if user is not the auction owner
    if (auction.shop.owner?.id === userId) {
      throw new ForbiddenException('Cannot bid on your own auction');
    }

    // Mark previous highest bid as outbid
    if (auction.bids && auction.bids.length > 0) {
      const currentHighestBid = auction.bids[0];
      if (currentHighestBid) {
        currentHighestBid.status = BidStatus.OUTBID;
        await this.bidRepository.save(currentHighestBid);
      }
    }

    // Create new bid
    const bid = this.bidRepository.create({
      amount: placeBidDto.amount,
      isAutoBid: placeBidDto.isAutoBid || false,
      maxAutoBidAmount: placeBidDto.maxAutoBidAmount,
      user: { id: userId },
      auction: { id: auctionId },
      status: BidStatus.WINNING,
    });

    const savedBid = await this.bidRepository.save(bid);

    // Update auction current bid and stats
    auction.currentBid = placeBidDto.amount;
    auction.totalBids += 1;
    
    // Update unique bidders count
    const uniqueBidders = await this.bidRepository
      .createQueryBuilder('bid')
      .select('COUNT(DISTINCT bid.userId)', 'count')
      .where('bid.auctionId = :auctionId', { auctionId })
      .getRawOne();
    
    auction.uniqueBidders = parseInt(uniqueBidders.count);

    // Auto-extend auction if enabled and close to end
    if (auction.autoExtend) {
      const timeLeft = auction.endTime.getTime() - Date.now();
      const extendThreshold = auction.autoExtendMinutes * 60 * 1000;
      
      if (timeLeft < extendThreshold) {
        auction.endTime = new Date(Date.now() + extendThreshold);
        console.log(`⏰ Auto-extending auction ${auctionId} by ${auction.autoExtendMinutes} minutes`);
      }
    }

    await this.auctionRepository.save(auction);

    console.log(`✅ Bid placed successfully on auction ${auctionId} for $${placeBidDto.amount}`);
    return savedBid;
  }

  async getAuctionBids(auctionId: string, page = 1, limit = 10) {
    console.log(`🔍 Getting bids for auction ${auctionId} - Page: ${page}, Limit: ${limit}`);
    
    const [bids, total] = await this.bidRepository.findAndCount({
      where: { auction: { id: auctionId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    console.log(`📊 Found ${total} bids for auction ${auctionId}`);

    return {
      data: bids,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async endAuction(auctionId: string): Promise<Auction> {
    console.log(`🏁 Ending auction: ${auctionId}`);
    
    const auction = await this.findOne(auctionId);
    
    if (auction.status !== AuctionStatus.LIVE) {
      throw new BadRequestException('Only live auctions can be ended');
    }

    // Find the winning bid
    const winningBid = await this.bidRepository.findOne({
      where: { auction: { id: auctionId }, status: BidStatus.WINNING },
      relations: ['user'],
      order: { amount: 'DESC' },
    });

    if (winningBid) {
      auction.winnerId = winningBid.user.id;
      auction.finalPrice = winningBid.amount;
      auction.soldAt = new Date();
      auction.status = AuctionStatus.SOLD;
      
      // Mark winning bid as won
      winningBid.status = BidStatus.WON;
      await this.bidRepository.save(winningBid);
      
      // Mark other bids as lost
      await this.bidRepository.update(
        { auction: { id: auctionId }, status: BidStatus.ACTIVE },
        { status: BidStatus.LOST }
      );
    } else {
      auction.status = AuctionStatus.ENDED;
    }

    const endedAuction = await this.auctionRepository.save(auction);
    console.log(`✅ Auction ended successfully: ${auctionId}`);
    
    return endedAuction;
  }

  async getAuctionStats() {
    console.log('📊 Getting auction statistics');
    
    const totalAuctions = await this.auctionRepository.count();
    const liveAuctions = await this.auctionRepository.count({ 
      where: { status: AuctionStatus.LIVE } 
    });
    const endedAuctions = await this.auctionRepository.count({ 
      where: { status: AuctionStatus.ENDED } 
    });
    const soldAuctions = await this.auctionRepository.count({ 
      where: { status: AuctionStatus.SOLD } 
    });

    const stats = {
      total: totalAuctions,
      live: liveAuctions,
      ended: endedAuctions,
      sold: soldAuctions,
      upcoming: totalAuctions - liveAuctions - endedAuctions - soldAuctions,
    };

    console.log('📊 Auction stats:', stats);
    return stats;
  }
}