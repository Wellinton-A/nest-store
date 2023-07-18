import { Expose } from 'class-transformer'

export class ReturnAddressDto {
  @Expose()
  id: number

  @Expose()
  user_id: number

  @Expose()
  complement: string

  @Expose()
  numberAddress: number

  @Expose()
  cep: string

  @Expose()
  city_id: number
}
