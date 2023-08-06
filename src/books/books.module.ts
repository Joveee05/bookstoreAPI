import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [PrismaModule, LogsModule],
})
export class BooksModule {}
