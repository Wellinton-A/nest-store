import { Controller, Get, Param } from '@nestjs/common'
import { CityService } from './city.service'
import { CityEntity } from './entities/city.entity'
import { serialize } from '../interceptors/serialize.interceptor'
import { ReturnCity } from './dtos/return-city.dto'

@Controller('city')
export class CityController {
  constructor(private readonly servicesCity: CityService) {}

  @serialize(ReturnCity)
  @Get('/:stateId')
  async getAllCitiesByStateId(
    @Param('stateId') stateId: number,
  ): Promise<CityEntity[]> {
    return await this.servicesCity.getAllCitiesByStateId(stateId)
  }
}
