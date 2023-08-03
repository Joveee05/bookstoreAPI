import { Book } from '../dto/create-book.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BookEntity implements Book {
  @ApiProperty()
  bookId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
