import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthUserDto } from './dtos/auth.dto'
import { serialize } from '../interceptors/serialize.interceptor'
import { ReturnLogin } from './dtos/return-login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @serialize(ReturnLogin)
  @Post('login')
  async userAuth(@Body() body: AuthUserDto) {
    return this.authService.loginUser(body)
  }
}
