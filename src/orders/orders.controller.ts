import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { LogsService } from 'src/logs/logs.service';

@Controller('orders')
@ApiTags('Orders')
@UseFilters(PrismaClientExceptionFilter)
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly logService: LogsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Order created successfully',
    type: OrderEntity,
    isArray: true,
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    const message = 'This is a log message. POST /api/orders';
    await this.logService.log(message);
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({
    description: '2 orders found',
    type: OrderEntity,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Could not find orders' })
  async findAll() {
    const message = 'This is a log message. GET /api/orders';
    await this.logService.log(message);
    return this.ordersService.findAll();
  }

  @Get(':orderId')
  @ApiOkResponse({
    description: 'Order found',
    type: OrderEntity,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Could not find order with this id' })
  async findOne(@Param('orderId', ParseIntPipe) orderId: number) {
    const message = 'This is a log message. GET /api/orders/:orderId';
    await this.logService.log(message);
    const order = await this.ordersService.findOne(orderId);
    if (!order) {
      throw new NotFoundException(`Order with id: ${orderId} was not found`);
    }

    return order;
  }

  @Patch(':orderId')
  @ApiOkResponse({ description: 'Order updated', type: OrderEntity })
  async update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const message = 'This is a log message. PATCH /api/orders/:orderId';
    await this.logService.log(message);
    return this.ordersService.update(orderId, updateOrderDto);
  }

  @Delete('cancel-order/:orderId')
  @ApiOkResponse({ description: 'Order deleted' })
  async remove(@Param('orderId', ParseIntPipe) orderId: number) {
    const message =
      'This is a log message. DELETE /api/orders/cancel-order/:orderId';
    await this.logService.log(message);
    const order = await this.ordersService.remove(orderId);
    if (!order) {
      throw new NotFoundException(`Order with id: ${orderId} was not found`);
    }

    return order;
  }

  @Get('order_history/:userId')
  @ApiOkResponse({
    description: '2 orders found',
    type: OrderEntity,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Could not find orders' })
  async myOrders(@Param('userId', ParseIntPipe) userId: number) {
    const message =
      'This is a log message. GET /api/orders/order_history/:userId';
    await this.logService.log(message);
    return this.ordersService.orderHistory(userId);
  }
}
