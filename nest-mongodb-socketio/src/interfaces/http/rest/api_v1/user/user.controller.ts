import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { UserService } from '@src/infra/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Query() query: any) {
    return this.userService.list(query);
  }

  @Post()
  createUser(@Body() payload: any) {
    return this.userService.create(payload);
  }
}
