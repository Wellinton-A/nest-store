import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StateEntity } from './entities/state.entity'
import { Repository } from 'typeorm'

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly repo: Repository<StateEntity>,
  ) {}

  getAllStates(): Promise<StateEntity[]> {
    return this.repo.find()
  }

  async getStateById(stateId: number) {
    const state = this.repo.findOne({
      where: {
        id: stateId,
      },
      relations: ['cities', 'cities.addresses'],
    })
    if (!state) {
      throw new NotFoundException('State id does not exists.')
    }
    return state
  }
}
