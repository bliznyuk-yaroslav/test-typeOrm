import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('create-random')
  async createRandom() {
    return this.usersService.createRandom();
  }
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
