import { Injectable } from '@nestjs/common';
import { Group, User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupCreationModel, GroupUpdateModel } from 'src/models';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,

    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getAll(): Promise<Group[]> {
    return this.groupsRepository.find({
      relations: {
        users: true
      }
    })
  }

  get(id: number): Promise<Group | null> {
    return this.groupsRepository.findOne({
      where: {
        id 
      },

      relations: {
        users: true
      }
    })
  }

  remove(id: number) {
    this.groupsRepository.delete(id)
  }

  create(model: GroupCreationModel) {
    this.groupsRepository.insert({
      ...model
    })
  }

  update(id: number, model: GroupUpdateModel) {
    this.groupsRepository.update({ id }, { ...model })
  }

  async addUser(id: number, userId: number) {
    const group = await this.groupsRepository.findOne({ 
      where: {
        id
      },

      relations: {
        users: true
      }
    })

    if(!group) {
      return
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: userId 
      },

      relations: {
        groups: true
      }
    })

    if(!user) {
      return
    }

    if(!group.users) {
      group.users = [user]
    }
    else {
      group.users.push(user)
    }
    
    this.groupsRepository.save(group)
  }
}
