import { Module } from '@nestjs/common';
import { GroupController } from '../controllers';
import { GroupService } from '../services';
import { Group, User } from '../entities'
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupResolver } from '../resolvers';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, User]),

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
  controllers: [GroupController],
  providers: [GroupService, GroupResolver],
})
export class GroupModule {}
