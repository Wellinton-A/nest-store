import { ForbiddenException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { AuthUserDto } from './dtos/auth.dto'
import { validPassword } from '../utils/password'
import { UserEntity } from '../users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { LoginPayload } from './dtos/login-payload.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginInfo: AuthUserDto) {
    const [user]: UserEntity[] = await this.usersService.findUserByEmail(
      loginInfo.email,
    )

    const isValidated = validPassword(
      loginInfo.password,
      user?.salt,
      user?.hashedpassword,
    )

    if (!user || !isValidated) {
      throw new ForbiddenException('Invalid email or password.')
    }

    const loginPayload = new LoginPayload(user)
    const payload = {
      id: loginPayload.id,
      typeUser: loginPayload.type_user,
    }

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    }
  }
}
