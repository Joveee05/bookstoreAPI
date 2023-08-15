import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'The id of the book' })
  bookId: number;

  @ApiProperty({ description: 'The ponts/price of the book' })
  points: number;

  @ApiProperty({ description: 'The orderId of the book' })
  orderId: number;

  @ApiProperty({ description: 'The userId that ordered the book' })
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
