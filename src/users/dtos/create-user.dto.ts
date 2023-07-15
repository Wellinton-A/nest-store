import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  phone: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  cpf: string

  @IsString()
  password: string
}
