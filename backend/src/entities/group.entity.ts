import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { User } from './user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  name: string;

  @Column()
  permissions: string;

  @ManyToMany(type => User, (user) => user.groups) @JoinTable()
  users: User[];
}