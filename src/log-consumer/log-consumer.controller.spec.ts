import { Test, TestingModule } from '@nestjs/testing';
import { LogConsumerController } from './log-consumer.controller';
import { LogConsumerService } from './log-consumer.service';

describe('LogConsumerController', () => {
  let controller: LogConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogConsumerController],
      providers: [LogConsumerService],
    }).compile();

    controller = module.get<LogConsumerController>(LogConsumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
