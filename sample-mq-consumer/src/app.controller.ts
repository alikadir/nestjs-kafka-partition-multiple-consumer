import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('sample-topic')
  async consumeMessage(
    @Payload() uniqueId: string,
    @Ctx() context: KafkaContext,
  ) {
    const message = context.getMessage();
    console.log(
      `PARTITION: ${context.getPartition()} - OFFSET: ${
        message.offset
      } - MESSAGE: ${uniqueId} - ${JSON.stringify(message)}`,
    );
    console.log('========================');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
