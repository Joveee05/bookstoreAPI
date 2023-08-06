import { Injectable } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

@Injectable()
export class LogsService {
  private readonly queueName = 'api_logs';

  async log(message: string) {
    const connection = await connect('amqp://localhost');
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue(this.queueName);
    channel.sendToQueue(this.queueName, Buffer.from(message));
    console.log(`[LoggerService] Sent log message: ${message}`);
    await channel.close();
    await connection.close();
  }
}
