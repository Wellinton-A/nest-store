import { Expose, Type } from 'class-transformer'
import { ReturnAddressDto } from '../../address/dtos/return-address.dto'

export class ReturnCityDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  @Type(() => ReturnAddressDto)
  addresses?: ReturnAddressDto[]
}
