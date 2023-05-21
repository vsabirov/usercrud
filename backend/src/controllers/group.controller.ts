import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { GroupService } from '../services';
import { GroupCreationModel, GroupRelateUserModel, GroupUpdateModel } from '../models';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  async create(@Body() model: GroupCreationModel) {
    return await this.groupService.create(model)
  }

  @Get('all')
  async getAll() {
    return await this.groupService.getAll()
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.groupService.get(id)
  }

  @Post(':id/user')
  addUser(@Param('id') id: number, @Body() model: GroupRelateUserModel) {
    this.groupService.addUser(id, model.userId)
  }

  @Delete(':id/user')
  removeUser(@Param('id') id: number, @Body() model: GroupRelateUserModel) {
    this.groupService.removeUser(id, model.userId)
  }

  @Patch(':id/update')
  async update(@Param('id') id: number, @Body() model: GroupUpdateModel) {
    return await this.groupService.update(id, model)
  }

  @Delete(':id/delete')
  async remove(@Param('id') id: number) {
    return await this.groupService.remove(id)
  }

  @MessagePattern({cmd: 'group-create'})
  handleCreateMessage(@Payload() payload: { model: GroupCreationModel }) {
    this.groupService.create(payload.model)
  }

  @MessagePattern({cmd: 'group-add-user'})
  handleAddUserMessage(@Payload() payload: { id: number, model: GroupRelateUserModel }) {
    this.groupService.addUser(payload.id, payload.model.userId)
  }

  @MessagePattern({cmd: 'group-remove-user'})
  handleRemoveUserMessage(@Payload() payload: { id: number, model: GroupRelateUserModel }) {
    this.groupService.removeUser(payload.id, payload.model.userId)
  }

  @MessagePattern({cmd: 'group-update'})
  handleUpdateMessage(@Payload() payload: { id: number, model: GroupUpdateModel }) {
    this.groupService.update(payload.id, payload.model)
  }

  @MessagePattern({cmd: 'group-remove'})
  handleRemoveMessage(@Payload() payload: { id: number }) {
    this.groupService.remove(payload.id)
  }
}
