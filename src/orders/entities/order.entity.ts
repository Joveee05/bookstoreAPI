import { Order } from '../dto/create-order.dto';
import { ApiProperty } from '@nestjs/swagger';

export class OrderEntity implements Order {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  bookId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  points: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
