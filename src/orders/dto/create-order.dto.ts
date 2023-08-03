import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  bookId: number;

  @ApiProperty()
  points: number;

  @ApiProperty()
  orderId: number;

  @ApiProperty()
  userId: number;
}

export type Order = {
  bookId: number;
  userId: number;
  orderId: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
};
