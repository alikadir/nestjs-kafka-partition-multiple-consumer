import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Kafka } from 'kafkajs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('SAMPLE_KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
  ) {}

  async sendMessage(uniqueId: string) {
    return await lastValueFrom(
      this.kafkaService.emit('sample-topic', uniqueId),
    );
  }

  async onModuleInit() {
    const kafkaAdmin = this.kafkaService.createClient<Kafka>().admin();
    const topicList = await kafkaAdmin.listTopics();
    console.log({ topicList });

    if (!topicList.includes('sample-topic')) {
      await kafkaAdmin.createTopics({
        topics: [{ topic: 'sample-topic', numPartitions: 3 }],
        waitForLeaders: true,
      });
      console.log('sample-topic created!');
    }
  }
}
