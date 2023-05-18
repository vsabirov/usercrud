import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToMany,
  JoinTable
} from 'typeorm'

import { Group } from '.';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  username: string;

  @ManyToMany(type => User, (user) => user.friends) @JoinTable()
  friends: User[];

  @ManyToMany(type => Group, (group) => group.users)
  groups: Group[];
}