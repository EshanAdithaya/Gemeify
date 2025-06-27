# Gemify Multivendor Backend

A comprehensive NestJS-based backend API for the Gemify multivendor gem marketplace.

## Features

### 🚀 Core Features
- **Multivendor System**: Multiple shops can list and sell gems
- **Role-based Access Control**: Super Admin, Shop Admin, and User roles
- **JWT Authentication**: Secure authentication with JWT tokens
- **MySQL Database**: Robust relational database with TypeORM
- **RESTful API**: Complete CRUD operations for all entities
- **File Upload**: Image and document upload capabilities
- **Auction System**: Live bidding on premium gems
- **Review System**: Customer reviews and ratings
- **Wishlist**: Save favorite gems for later
- **Order Management**: Complete e-commerce order processing

### 🛡️ Security
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based authorization guards
- Input validation with class-validator
- CORS protection
- Rate limiting ready

### 📊 Admin Features
- Super Admin dashboard
- Shop management and approval
- User management
- Analytics and reporting
- Commission management

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone and setup**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and other settings
   ```

3. **Database Setup**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE gemify_multivendor;
   ```

4. **Start Development Server**
   ```bash
   npm run start:dev
   ```

The API will be available at:
- **API**: http://localhost:3001
- **Documentation**: http://localhost:3001/api

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `PATCH /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password
- `POST /auth/verify-email` - Verify email address

### Users
- `GET /users` - Get all users (Super Admin)
- `GET /users/stats` - Get user statistics
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Shops
- `GET /shops` - Get all shops
- `GET /shops/:id` - Get shop by ID
- `POST /shops` - Create new shop
- `PATCH /shops/:id` - Update shop
- `DELETE /shops/:id` - Delete shop

### Gems
- `GET /gems` - Get all gems with pagination
- `GET /gems/:id` - Get gem by ID
- `POST /gems` - Create new gem
- `PATCH /gems/:id` - Update gem
- `DELETE /gems/:id` - Delete gem

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category
- `PATCH /categories/:id` - Update category

## Database Schema

### Core Entities
- **Users**: Customer and admin accounts
- **Shops**: Vendor stores
- **Gems**: Product listings
- **Categories**: Product categorization
- **Orders**: Purchase transactions
- **OrderItems**: Individual order line items
- **Auctions**: Auction listings
- **Bids**: Auction bids
- **Reviews**: Customer reviews
- **WishlistItems**: Saved items

### User Roles
- **SUPER_ADMIN**: Full system access
- **SHOP_ADMIN**: Shop management access
- **USER**: Customer access

### Shop Status
- **PENDING**: Awaiting approval
- **APPROVED**: Active shop
- **SUSPENDED**: Temporarily disabled
- **REJECTED**: Application denied

### Gem Status
- **DRAFT**: Work in progress
- **PENDING**: Awaiting approval
- **APPROVED**: Live on marketplace
- **SOLD**: No longer available
- **INACTIVE**: Temporarily hidden

## Project Structure

```
src/
├── auth/                 # Authentication module
├── users/               # User management
├── shops/               # Shop management
├── gems/                # Gem/product management
├── categories/          # Category management
├── orders/              # Order processing
├── auctions/            # Auction system
├── bids/                # Bidding system
├── reviews/             # Review system
├── wishlist/            # Wishlist functionality
├── analytics/           # Analytics and reporting
├── notifications/       # Notification system
├── uploads/             # File upload handling
├── common/              # Shared utilities
│   ├── guards/          # Authorization guards
│   ├── decorators/      # Custom decorators
│   ├── filters/         # Exception filters
│   ├── interceptors/    # Response interceptors
│   ├── pipes/           # Validation pipes
│   └── dto/             # Common DTOs
├── database/            # Database configuration
├── main.ts              # Application entry point
└── app.module.ts        # Root module
```

## Development

### Available Scripts
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Lint code

### Adding New Features
1. Create module with `nest g module feature-name`
2. Add service with `nest g service feature-name`
3. Add controller with `nest g controller feature-name`
4. Create entities, DTOs, and add to app.module.ts

### Database Migrations
TypeORM synchronize is enabled in development. For production:
1. Disable synchronize in app.module.ts
2. Generate migrations: `npm run migration:generate`
3. Run migrations: `npm run migration:run`

## Production Deployment

### Environment Variables
Set all variables from `.env.example` in your production environment.

### Database
- Set `synchronize: false` in production
- Use proper database credentials
- Enable SSL if required

### Security
- Use strong JWT secret
- Enable HTTPS
- Configure proper CORS origins
- Set up rate limiting
- Use environment-specific logging

## API Documentation

Interactive API documentation is available at `/api` when the server is running. This includes:
- All endpoint documentation
- Request/response schemas
- Authentication requirements
- Try-it-out functionality

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## License

This project is licensed under the ISC License.