import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(5)
  @ApiProperty()
  author: string;

  @ApiProperty()
  point: number;

  @ApiProperty()
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
