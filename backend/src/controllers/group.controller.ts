import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { GroupService } from '../services';
import { GroupCreationModel, GroupRelateUserModel, GroupUpdateModel } from '../models';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() model: GroupCreationModel) {
    this.groupService.create(model)
  }

  @Get()
  getAll() {
    return this.groupService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.groupService.get(id)
  }

  @Post(':id/user')
  addUser(@Param('id') id: number, @Body() model: GroupRelateUserModel) {
    this.groupService.addUser(id, model.userId)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() model: GroupUpdateModel) {
    this.groupService.update(id, model)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.groupService.remove(id)
  }
}
