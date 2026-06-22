import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Place an order' })
  async create(@Request() req: any, @Body() dto: CreateOrderDto) {
    const order = await this.ordersService.create(req.user.id, dto);
    return { message: 'Order placed successfully', data: order };
  }

  @Get()
  @ApiOperation({ summary: "Get the current user's orders" })
  async findMine(
    @Request() req: any,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const data = await this.ordersService.findForUser(req.user.id, +page, +limit);
    return { message: 'Orders retrieved successfully', data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single order (owner or staff)' })
  async findOne(@Request() req: any, @Param('id') id: string) {
    const order = await this.ordersService.findOne(id, req.user.id, req.user.role);
    return { message: 'Order retrieved successfully', data: order };
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
  @ApiOperation({ summary: 'Update order status (staff)' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
    @Body('note') note?: string,
  ) {
    const order = await this.ordersService.updateStatus(id, status, note);
    return { message: 'Order status updated', data: order };
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel an order and restock' })
  async cancel(@Request() req: any, @Param('id') id: string) {
    const order = await this.ordersService.cancel(id, req.user.id);
    return { message: 'Order cancelled successfully', data: order };
  }
}
