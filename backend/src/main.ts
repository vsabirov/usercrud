import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls:[process.env.RMQ_ADDRESS ?? 'amqp://localhost:5672'],
      queue: process.env.RMQ_QUEUE ?? 'usercrud',
      queueOptions: {
        durable: true
      }
    }
  });

  await app.startAllMicroservices()
  await app.listen(3000);
}

bootstrap();
