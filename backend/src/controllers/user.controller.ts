import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '../services';
import { UserRelateFriendModel, UserCreationModel, UserUpdateModel } from 'src/models';
import { MessagePattern, Payload } from '@nestjs/microservices';

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

  @MessagePattern({cmd: 'user-create'})
  handleCreateMessage(@Payload() payload: { model: UserCreationModel }) {
    this.userService.create(payload.model)
  }

  @MessagePattern({cmd: 'user-add-friend'})
  handleAddFriendMessage(@Payload() payload: { id: number, model: UserRelateFriendModel }) {
    this.userService.addFriend(payload.id, payload.model.friendId)
  }

  @MessagePattern({cmd: 'user-remove-friend'})
  handleRemoveFriendMessage(@Payload() payload: { id: number, model: UserRelateFriendModel }) {
    this.userService.removeFriend(payload.id, payload.model.friendId)
  }

  @MessagePattern({cmd: 'user-update'})
  handleUpdateMessage(@Payload() payload: { id: number, model: UserUpdateModel }) {
    this.userService.update(payload.id, payload.model)
  }

  @MessagePattern({cmd: 'user-remove'})
  handleRemoveMessage(@Payload() payload: { id: number }) {
    this.userService.remove(payload.id)
  }
}
