import { Expose } from 'class-transformer'

export class ReturnUser {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  cpf: string
}
