import { Controller } from '@nestjs/common';
import { LogConsumerService } from './log-consumer.service';

@Controller()
export class LogConsumerController {
  constructor(private readonly logConsumerService: LogConsumerService) {}
}
