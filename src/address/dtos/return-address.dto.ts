import { Expose } from 'class-transformer'

export class ReturnAddressDto {
  @Expose()
  id: number

  @Expose()
  userId: number

  @Expose()
  complement: string

  @Expose()
  numberAddress: number

  @Expose()
  cep: string

  @Expose()
  cityId: number
}
