import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dtos/create-user.dto'
import { getUserByCpf, getUserByEmail, userByIdQuery } from '../utils/query'
import { hashPassword } from '../utils/password'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const userCheckEmail: UserEntity[] = await this.repo.query(getUserByEmail, [
      userDto.email,
    ])
    if (userCheckEmail.length) {
      throw new ConflictException('Email already in use.')
    }

    const userCheckCpf: UserEntity[] = await this.repo.query(getUserByCpf, [
      userDto.cpf,
    ])
    if (userCheckCpf.length) {
      throw new ConflictException('Cpf already in use.')
    }

    const hashSalt = hashPassword(userDto.password)
    const hashedpassword = hashSalt.hashedPassword
    const salt = hashSalt.salt

    const user = this.repo.create({
      ...userDto,
      hashedpassword,
      salt,
      type_user: 1,
    })

    return this.repo.save(user)
  }

  async findUserById(userId: number): Promise<UserEntity[]> {
    return this.repo.query(userByIdQuery, [userId])
  }

  async findUserByEmail(email: string) {
    return this.repo.query(getUserByEmail, [email])
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.repo.query('SELECT * FROM "user";')
    return users
  }

  async findUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['addresses'],
    })
  }
}
