import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(5)
  @ApiProperty({ description: 'The title of the book' })
  title: string;

  @IsString()
  @MinLength(5)
  @ApiProperty({ description: 'The author/writer of the book' })
  author: string;

  @ApiProperty({ description: 'The price of the book' })
  point: number;

  @ApiProperty({ description: 'The tag/genre of the book' })
  tag: string;
}

export type Book = {
  bookId: number;
  title: string;
  author: string;
  point: number;
  createdAt: Date;
  updatedAt: Date;
};
