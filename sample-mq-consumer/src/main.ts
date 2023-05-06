import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'consumer-1',
          brokers: ['localhost:29092'],
        },
       consumer: {
          groupId: 'consumer-group-1',
        },
       subscribe: {
          fromBeginning: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
