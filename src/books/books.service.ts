import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  create(createBookDto: CreateBookDto) {
    return this.prisma.books.create({ data: createBookDto });
  }

  findAll() {
    return this.prisma.books.findMany();
  }

  findOne(bookId: number) {
    return this.prisma.books.findUnique({ where: { bookId } });
  }

  update(bookId: number, updateBookDto: UpdateBookDto) {
    return this.prisma.books.update({
      where: { bookId },
      data: updateBookDto,
    });
  }

  remove(bookId: number) {
    return this.prisma.books.delete({ where: { bookId } });
  }
}
