import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dtos/create-user.dto'
import { checkinfos, userByIdQuery } from '../utils/query'
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

  async findUserById(userId: number): Promise<UserEntity[]> {
    return this.repo.query(userByIdQuery, [userId])
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.repo.query('SELECT * FROM "user";')
    return users
  }

  async findUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return await this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'addresses')
      .where('user.id = :id', { id: userId })
      .getOne()
  }
}
