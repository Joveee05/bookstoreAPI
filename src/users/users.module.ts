import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, LogsModule],
})
export class UsersModule {}
