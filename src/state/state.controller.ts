import { Controller, Get } from '@nestjs/common'
import { StateService } from './state.service'
import { StateEntity } from './entities/state.entity'

@Controller('state')
export class StateController {
  constructor(private readonly servicesState: StateService) {}

  @Get()
  async getAll(): Promise<StateEntity[]> {
    return await this.servicesState.getAllStates()
  }
}
