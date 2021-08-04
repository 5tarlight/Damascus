import { FastifyPluginCallback } from 'fastify'
import authRoute from './auth'
import fileRoute from './file'

const apiRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(fileRoute, { prefix: '/file' })

  done()
}

export default apiRoute
