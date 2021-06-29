import { FastifyPluginCallback } from 'fastify'
import { user } from '../Database'
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
      const { email, password, username } = request.body
      const has = (await user.find({ email: email })).length > 0
      if (!has) {
        user.add('email, password, username', email, password, username)
        reply.code(200).send({ suc: true })
      } else {
        reply.code(400).send({ suc: false, msg: 'Already Exists' })
      }
    }
  )

  done()
}

export default authRoute
