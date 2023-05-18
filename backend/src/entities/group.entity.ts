import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'

import { User } from './user.entity';

import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ length: 32 })
  @Field()
  name: string;

  @Column()
  @Field()
  permissions: string;

  @ManyToMany(type => User, (user) => user.groups) @JoinTable()
  @Field(type => [User])
  users: User[];
}