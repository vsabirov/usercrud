import { Injectable } from '@nestjs/common';
import { Group, User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
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

  remove(id: number): Promise<DeleteResult> {
    return this.groupsRepository.delete(id)
  }

  create(model: GroupCreationModel): Promise<InsertResult> {
    return this.groupsRepository.insert({
      ...model
    })
  }

  update(id: number, model: GroupUpdateModel): Promise<UpdateResult> {
    return this.groupsRepository.update({ id }, { ...model })
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

  async removeUser(id: number, userId: number) {
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

    if(group.users) {
      group.users = group.users.filter(user => {
        return user.id !== userId
      })
    }

    this.groupsRepository.save(group)
  }
}
