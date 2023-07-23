import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CacheService } from '../cache/cache.service'
import { CityEntity } from './entities/city.entity'
import { getCities } from '../utils/query'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity) private readonly repo: Repository<CityEntity>,
    private readonly servicesCache: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return await this.servicesCache.getCache<CityEntity[]>(
      `state_${stateId}`,
      async () => await this.repo.query(getCities, [stateId]),
    )
  }

  async getCityById(city_id: number) {
    const city = await this.repo.findOne({
      where: {
        id: city_id,
      },
      relations: ['addresses'],
    })
    if (!city) {
      throw new NotFoundException('City Id does not exist')
    }
    return city
  }
}
