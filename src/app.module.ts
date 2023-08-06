import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import { LogConsumerModule } from './log-consumer/log-consumer.module';

@Module({
  imports: [
    PrismaModule,
    BooksModule,
    OrdersModule,
    UsersModule,
    LogsModule,
    LogConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
