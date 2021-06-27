import { FastifyPluginCallback } from 'fastify'
import SignUpBody from './schema/SignUpBody.json'

interface SignUp {
  email: string
  username: string
  password: string
}

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', {}, async (req, rep) => {
    rep.send({
      msg: 'Damascus auth api',
    })
  })

  /**
   * POST /api/auth/signup
   * handle sign up action
   */
  fastify.post<{ Body: SignUp }>(
    '/signup',
    {
      schema: {
        body: SignUpBody,
      },
    },
    async (request, reply) => {
      reply.send(request.body)
    }
  )

  done()
}

export default authRoute
