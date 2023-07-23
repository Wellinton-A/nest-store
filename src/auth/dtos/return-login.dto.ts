import { Expose, Type } from 'class-transformer'
import { ReturnUserDto } from 'src/users/dtos/return-user.dto'

export class ReturnLogin {
  @Expose()
  @Type(() => ReturnUserDto)
  user: ReturnUserDto

  @Expose()
  accessToken: string
}
