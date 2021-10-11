import { FastifyPluginCallback } from 'fastify'
import authRoute from './auth'
import fileRoute from './file'
import postRoute from './post'

const apiRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(fileRoute, { prefix: '/file' })
  fastify.register(postRoute, { prefix: '/post' })

  done()
}

export default apiRoute
