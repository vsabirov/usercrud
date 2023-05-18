import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { UserCreationModel, UserUpdateModel } from '../models';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        friends: true,
        groups: true
      }
    })
  }

  get(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id 
      },

      relations: {
        friends: true,
        groups: true
      }
    })
  }

  remove(id: number) {
    this.usersRepository.delete(id)
  }

  create(model: UserCreationModel) {
    this.usersRepository.insert({
      ...model
    })
  }

  update(id: number, model: UserUpdateModel) {
    this.usersRepository.update({ id }, { ...model })
  }

  async addFriend(id: number, friendId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id 
      },

      relations: {
        friends: true
      }
    })

    if(!user) {
      return
    }

    const friend = await this.usersRepository.findOne({
      where: {
        id: friendId 
      },

      relations: {
        friends: true
      }
    })

    if(!friend) {
      return
    }

    if(!user.friends) {
      user.friends = [friend]
    }
    else {
      user.friends.push(friend)
    }

    if(!friend.friends) {
      friend.friends = [user]
    }
    else {
      friend.friends.push(user)
    }

    this.usersRepository.save(user)
    this.usersRepository.save(friend)
  }

  async removeFriend(id: number, friendId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id 
      },

      relations: {
        friends: true
      }
    })

    if(!user) {
      return
    }

    if(user.friends) {
      user.friends = user.friends.filter(friend => {
        return friend.id !== friendId
      })
    }

    this.usersRepository.save(user)
  }
}
