import { Module } from '@nestjs/common'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressEntity } from './entities/address.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
