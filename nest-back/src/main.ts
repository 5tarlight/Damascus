import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: (req, cb) => {
      const allowed = [
        'localhost',
        'localhost:3000',
        'damascus.kro.kr',
        'damascus.kro.kr:3000',
      ]
      let corsOptions = { origin: false }
      if (
        req.header('Origin') &&
        allowed.indexOf(req.header('Origin').split('://')[1]) !== -1
      ) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false } // disable CORS for this request
      }
      cb(null, corsOptions) // callback expects two parameters: error and options
    },
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )
  await app.listen(5676)
}
bootstrap()
