import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel, Message } from 'amqplib';
import * as fs from 'fs';

@Injectable()
export class LogConsumerService implements OnModuleInit {
  private readonly queueName = 'api_logs';

  async onModuleInit() {
    const connection = await connect('amqp://localhost');
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue(this.queueName);
    channel.consume(this.queueName, (message: any) =>
      this.handleLogMessage(message),
    );
    console.log(`[LogConsumerService] Log consumer is running.`);
  }

  private handleLogMessage(message: Message | null) {
    if (message) {
      const logMessage = message.content.toString();
      console.log(`[LogConsumerService] Received log message: ${logMessage}`);
      this.saveToLogFile(logMessage);
      message.ack();
    }
  }

  private saveToLogFile(logMessage: string) {
    const logFileName = 'api_logs.txt';
    fs.appendFileSync(logFileName, logMessage + '\n');
  }
}
