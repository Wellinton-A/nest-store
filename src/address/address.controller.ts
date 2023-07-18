import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dtos/create-address.dto'
import { serialize } from '../interceptors/serialize.interceptor'
import { ReturnAddressDto } from './dtos/return-address.dto'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  createAddress(@Body() body: CreateAddressDto) {
    return this.addressService.createAdress(body, 5)
  }

  @serialize(ReturnAddressDto)
  @Get('/:userId')
  async getAddressesByUserId(@Param('userId') userId: number) {
    return this.addressService.getAddressesByUserId(userId)
  }
}
