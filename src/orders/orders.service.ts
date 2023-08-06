import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return this.prisma.orders.create({ data: createOrderDto });
  }

  findAll() {
    return this.prisma.orders.findMany();
  }

  findOne(orderId: number) {
    return this.prisma.orders.findUnique({ where: { orderId } });
  }

  update(orderId: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.orders.update({
      where: { orderId },
      data: updateOrderDto,
    });
  }

  remove(orderId: number) {
    return this.prisma.orders.delete({ where: { orderId } });
  }

  orderHistory(userId: number) {
    return this.prisma.orders.findMany({ where: { userId } });
  }
}
