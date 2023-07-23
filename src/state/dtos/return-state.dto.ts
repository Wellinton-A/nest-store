import { Expose, Type } from 'class-transformer'
import { ReturnCityDto } from 'src/city/dtos/return-city.dto'

export class ReturnStateDto {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  @Type(() => ReturnCityDto)
  cities?: ReturnCityDto[]
}
