import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dtos/create-user.dto'
import { checkinfos } from '../utils/query'
import { hashPassword } from '../utils/password'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const userCheck: UserEntity[] = await this.repo.query(checkinfos, [
      userDto.email,
      userDto.cpf,
    ])
    if (userCheck.length) {
      throw new ConflictException()
    }
    const hashSalt = hashPassword(userDto.password)
    const hashedPassword = hashSalt.hashedPassword
    const salt = hashSalt.salt

    const user = this.repo.create({
      ...userDto,
      hashedPassword,
      salt,
      typeUser: 1,
    })

    return this.repo.save(user)
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.repo.query('SELECT * FROM "user";')
    return users
  }
}
