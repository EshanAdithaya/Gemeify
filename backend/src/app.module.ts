import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';

// Feature Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShopsModule } from './shops/shops.module';
import { GemsModule } from './gems/gems.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { AuctionsModule } from './auctions/auctions.module';
import { BidsModule } from './bids/bids.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UploadsModule } from './uploads/uploads.module';

// Entities
import { User } from './users/entities/user.entity';
import { Shop } from './shops/entities/shop.entity';
import { Gem } from './gems/entities/gem.entity';
import { Category } from './categories/entities/category.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { Auction } from './auctions/entities/auction.entity';
import { Bid } from './bids/entities/bid.entity';
import { Review } from './reviews/entities/review.entity';
import { WishlistItem } from './wishlist/entities/wishlist-item.entity';
import { Notification } from './notifications/entities/notification.entity';
import { AnalyticsEvent } from './analytics/entities/analytics-event.entity';
import { DailyStats } from './analytics/entities/daily-stats.entity';

@Module({
  controllers: [AppController],
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'gemify_multivendor',
      entities: [
        User,
        Shop,
        Gem,
        Category,
        Order,
        OrderItem,
        Auction,
        Bid,
        Review,
        WishlistItem,
        Notification,
        AnalyticsEvent,
        DailyStats,
      ],
      synchronize: true, // Set to false in production
      logging: process.env.NODE_ENV === 'development',
    }),

    // Static file serving for uploads
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    ShopsModule,
    GemsModule,
    CategoriesModule,
    OrdersModule,
    AuctionsModule,
    BidsModule,
    ReviewsModule,
    WishlistModule,
    AnalyticsModule,
    NotificationsModule,
    UploadsModule,
  ],
})
export class AppModule {}