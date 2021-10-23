import { AuthService } from './auth/auth.service'
import { Controller, Get } from '@nestjs/common'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  helloWorld() {
    return this.authService.helloWorld()
  }
}
