import { IsString } from 'class-validator'

export class SignUpDto {
  @IsString()
  email: string
  @IsString()
  username: string
  @IsString()
  password: string
}
