import { Controller, Get, Param } from '@nestjs/common'
import { StateService } from './state.service'
import { StateEntity } from './entities/state.entity'
import { serialize } from 'src/interceptors/serialize.interceptor'
import { ReturnStateDto } from './dtos/return-state.dto'

@Controller('state')
export class StateController {
  constructor(private readonly servicesState: StateService) {}

  @Get()
  async getAll(): Promise<StateEntity[]> {
    return await this.servicesState.getAllStates()
  }

  @serialize(ReturnStateDto)
  @Get('/:stateId')
  async getStateById(@Param('stateId') stateId: number) {
    return this.servicesState.getStateById(stateId)
  }
}
