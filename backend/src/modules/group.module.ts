import { Module } from '@nestjs/common';
import { GroupController } from '../controllers';
import { GroupService } from '../services';
import { Group, User } from '../entities'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
