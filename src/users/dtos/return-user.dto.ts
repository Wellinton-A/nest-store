import { Expose, Type } from 'class-transformer'
import { ReturnAddressDto } from 'src/address/dtos/return-address.dto'

export class ReturnUserDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  cpf: string

  @Expose()
  @Type(() => ReturnAddressDto)
  addresses: ReturnAddressDto[]
}
