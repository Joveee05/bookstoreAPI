import { Module } from '@nestjs/common';
import { LogConsumerService } from './log-consumer.service';

@Module({
  providers: [LogConsumerService],
})
export class LogConsumerModule {}
