import { Controller, Get, Param } from '@nestjs/common'
import { CityService } from './city.service'
import { CityEntity } from './entities/city.entity'
import { serialize } from '../interceptors/serialize.interceptor'
import { ReturnCityDto } from './dtos/return-city.dto'

@Controller('city')
export class CityController {
  constructor(private readonly servicesCity: CityService) {}

  @Get('/state/:stateId')
  async getAllCitiesByStateId(
    @Param('stateId') stateId: number,
  ): Promise<CityEntity[]> {
    return await this.servicesCity.getAllCitiesByStateId(stateId)
  }

  @serialize(ReturnCityDto)
  @Get('/:cityId')
  async getCityById(@Param('cityId') cityId: number) {
    return this.servicesCity.getCityById(cityId)
  }
}
