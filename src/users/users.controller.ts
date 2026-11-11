import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserResponse, UserDto } from './user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<CreateUserResponse> {
    return await this.usersService.create(user);
  }
}
