import { Expose } from 'class-transformer'

export class ReturnCity {
  @Expose()
  id: number

  @Expose()
  name: string
}
