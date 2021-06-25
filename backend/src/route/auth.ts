import { FastifyPluginCallback } from 'fastify'
import SignUpBody from './schema/SignUpBody.json'

interface SignUp {}

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  /**
   * POST /api/auth/signup
   * handle sign up action
   */
  fastify.get('/', {}, async (req, rep) => {
    rep.send({
      msg: 'Damascus auth api',
    })
  })

  fastify.post<{ Body: SignUp }>(
    '/signup',
    {
      schema: {
        body: SignUpBody,
      },
    },
    async (request, reply) => {
      reply.send({
        suc: 'yes',
      })
    }
  )

  done()
}

export default authRoute
