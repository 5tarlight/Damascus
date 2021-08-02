import fastify from 'fastify'
import corsPlugin from 'fastify-cors'
import cookie from 'fastify-cookie'
import compress from 'fastify-compress'
import apiRoute from './route/router'

const PORT = process.env.PORT! || 5676

export default class Server {
  app = fastify({ logger: true })

  constructor() {
    this.setup()
  }

  setup() {
    this.app.register(corsPlugin, {
      origin: (origin, callback) => {
        // callback(null, true)
        if (!origin) {
          return callback(null, true)
        }
        const host = origin.split('://')[1]
        const allowedHost = [
          'localhost:5676',
          'localhost:3000',
          'yeahx4.kro.kr:3000',
          'yeahx4.kro.kr',
          'yeahx4.kro.kr:5676',
          'damascus.kro.kr',
          'damascus.kro.kr:3000'
        ]
        console.log(origin)
        const allowed = allowedHost.includes(host)
        callback(null, allowed)
      },
      credentials: true,
    })
    this.app.register(cookie)
    this.app.register(compress)

    this.app.register(apiRoute, { prefix: '/api' })

    this.app.setErrorHandler((error, request, reply) => {
      reply.send({
        statusCode: error.statusCode,
        name: error.name,
        message: error.message,
        validation: error.validation,
        stack: error.stack,
      })
    })
  }

  start() {
    return this.app.listen(PORT, '0.0.0.0')
  }

  close() {
    return this.app.close()
  }
}
