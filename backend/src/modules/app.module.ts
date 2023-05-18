import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule, GroupModule } from '.';
import { User, Group } from '../entities'

@Module({
  imports: [
    UserModule, 
    GroupModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASSWORD ?? 'usercruddbpwdprod993',
      database: process.env.DB_NAME ?? 'usercrud',
      entities: [User, Group],
      synchronize: true
    })
  ],
})
export class AppModule {}
