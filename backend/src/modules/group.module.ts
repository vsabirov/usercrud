import { Module } from '@nestjs/common';
import { GroupController } from '../controllers';
import { GroupService } from '../services';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
