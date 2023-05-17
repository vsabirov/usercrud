import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { UserService } from '../services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
