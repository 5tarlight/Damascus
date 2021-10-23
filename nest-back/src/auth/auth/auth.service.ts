import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  public helloWorld() {
    return {
      message: 'Damascus Auth API!',
    }
  }
}
