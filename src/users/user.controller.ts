import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { CreateUserDto } from './dtos/create-user.dto'
import { UsersService } from './users.service'
import { serialize } from '../interceptors/serialize.interceptor'
import { ReturnUserDto } from './dtos/return-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @serialize(ReturnUserDto)
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body)
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAllUsers()
  }

  @serialize(ReturnUserDto)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number) {
    return await this.usersService.findUserByIdUsingRelations(userId)
  }
}
