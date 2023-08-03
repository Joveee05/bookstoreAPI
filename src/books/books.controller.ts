import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookEntity } from './entities/book.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@Controller('books')
@ApiTags('books')
@UseFilters(PrismaClientExceptionFilter)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiCreatedResponse({ type: BookEntity, isArray: true })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOkResponse({ description: '2 books found', type: BookEntity })
  @ApiNotFoundResponse({ description: 'Could not find books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':bookId')
  @ApiOkResponse({ description: 'Book found', type: BookEntity })
  @ApiNotFoundResponse({ description: 'Could not find book with this id' })
  async findOne(@Param('bookId', ParseIntPipe) bookId: number) {
    const book = await this.booksService.findOne(+bookId);

    if (!book) {
      throw new NotFoundException(`Book with id: ${bookId} was not found`);
    }

    return book;
  }

  @Patch(':bookId')
  @ApiOkResponse({ description: 'Book updated', type: BookEntity })
  update(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(+bookId, updateBookDto);
  }

  @Delete(':bookId')
  @ApiOkResponse({ description: 'Book deleted' })
  @ApiNotFoundResponse({ description: 'Could not find book with this id' })
  async remove(@Param('bookId', ParseIntPipe) bookId: number) {
    const book = await this.booksService.remove(+bookId);

    if (!book) {
      throw new NotFoundException(`Book with id: ${bookId} was not found`);
    }
    return book;
  }
}
