import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AddressEntity } from './entities/address.entity'
import { Repository } from 'typeorm'
import { CreateAddressDto } from './dtos/create-address.dto'
import { UsersService } from 'src/users/users.service'
import { getAddressesbyId } from '../utils/query'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly repo: Repository<AddressEntity>,
    private readonly usersService: UsersService,
  ) {}

  async createAdress(
    adrressInfo: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    const user = await this.usersService.findUserById(userId)
    if (!user.length) {
      throw new NotFoundException('User not exists')
    }
    const newUser = this.repo.create({ ...adrressInfo, userId })
    return await this.repo.save(newUser)
  }

  async getAddressesByUserId(userId: number) {
    const addresses = await this.repo.query(getAddressesbyId, [userId])
    if (!addresses.length) {
      throw new NotFoundException("There's no addresses for this user")
    }
    return addresses
  }
}
