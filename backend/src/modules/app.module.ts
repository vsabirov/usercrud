import { Module } from '@nestjs/common';
import { UserModule, GroupModule } from '.';

@Module({
  imports: [UserModule, GroupModule],
})
export class AppModule {}
