import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule, GroupModule } from '.';
import { User, Group } from '../entities'
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'node:path';

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
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    })
  ],
})
export class AppModule {}
