import { SignUpDto } from './auth/sign-up.dto'
import { AuthService } from './auth/auth.service'
import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  helloWorld() {
    return this.authService.helloWorld()
  }

  @Post('/signup')
  signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data)
  }
}
