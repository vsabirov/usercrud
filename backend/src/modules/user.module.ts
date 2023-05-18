import { Module } from '@nestjs/common';
import { UserController } from '../controllers';
import { UserService } from '../services';
import { User, Group } from '../entities'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
