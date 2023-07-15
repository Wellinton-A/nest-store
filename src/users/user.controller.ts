import { Body, Controller, Get, Post } from '@nestjs/common'

import { CreateUserDto } from './dtos/create-user.dto'
import { UsersService } from './users.service'
import { serialize } from '../interceptors/serialize.interceptor'
import { ReturnUser } from './dtos/return-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @serialize(ReturnUser)
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body)
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAllUsers()
  }
}
