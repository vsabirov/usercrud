import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Group } from '.';

import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ length: 32 })
  @Field()
  username: string;

  @ManyToMany(type => User, (user) => user.friends, {
    onDelete: 'CASCADE'
  }) @JoinTable()
  @Field(type => [User])
  friends: User[];

  @ManyToMany(type => Group, (group) => group.users, {
    onDelete: 'CASCADE'
  })
  @Field(type => [Group])
  groups: Group[];
}