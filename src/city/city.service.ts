import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CityEntity } from './entities/city.entity'
import { Repository } from 'typeorm'
import { getCities } from '../utils/query'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity) private readonly repo: Repository<CityEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const cachedCities: CityEntity[] = await this.cacheManager.get(
      `state_${stateId}`,
    )
    console.log(cachedCities)

    if (cachedCities) {
      return cachedCities
    }
    const cities = await this.repo.query(getCities, [stateId])
    await this.cacheManager.set(`state_${stateId}`, cities)
    return cities
  }
}
