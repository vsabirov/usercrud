import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../services';
import { UserRelateFriendModel, UserCreationModel, UserUpdateModel } from 'src/models';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() model: UserCreationModel) {
    this.userService.create(model)
  }

  @Get()
  getAll() {
    return this.userService.getAll()
  }

  @Post(':id/friend')
  addFriend(@Param('id') id: number, @Body() model: UserRelateFriendModel) {
    this.userService.addFriend(id, model.friendId)
  }

  @Delete(':id/friend')
  removeFriend(@Param('id') id: number, @Body() model: UserRelateFriendModel) {
    this.userService.removeFriend(id, model.friendId)
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.userService.get(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() model: UserUpdateModel) {
    this.userService.update(id, model)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.userService.remove(id)
  }
}
