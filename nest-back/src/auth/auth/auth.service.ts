import { SignUpDto } from './sign-up.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { profile, user } from 'src/Database'
import { v4 as uuid4 } from 'uuid'
import { SHA256 } from 'crypto-js'

@Injectable()
export class AuthService {
  public helloWorld() {
    return {
      message: 'Damascus Auth API!',
    }
  }

  public async signUp({ email, password, username }: SignUpDto) {
    const has = (await user.find({ email })).length > 0
    if (has) {
      throw new BadRequestException('Email already exists')
    }

    user.add(
      'id, email, password, username',
      uuid4(),
      email,
      SHA256(password).toString(),
      username
    )

    const added = await user.findOne({ email })
    await profile.add('id', added.id)

    return {
      id: added.id,
      email: added.email,
      username: added.username,
      admin: added.admin,
    }
  }
}
