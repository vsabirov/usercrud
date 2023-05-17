import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { GroupService } from '../services';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
}
