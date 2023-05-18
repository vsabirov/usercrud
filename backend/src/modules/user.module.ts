import { Module } from '@nestjs/common';
import { UserController } from '../controllers';
import { UserService } from '../services';
import { User, Group } from '../entities'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from '../resolvers';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group]),

    ClientsModule.register([{
      name: 'RMQ_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls:[process.env.RMQ_ADDRESS ?? 'amqp://localhost:5672'],
        queue: process.env.RMQ_QUEUE ?? 'usercrud',
        queueOptions: {
          durable: true
        }
      }
    }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
