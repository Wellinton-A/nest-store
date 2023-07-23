import { UserEntity } from 'src/users/entities/user.entity'

export class LoginPayload {
  id: number
  type_user: number

  constructor(private user: UserEntity) {
    this.id = user.id
    this.type_user = user.type_user
  }
}
