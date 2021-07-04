import { FastifyPluginCallback } from 'fastify'
import { user } from '../Database'
import { cryptSha } from '../util'
import SignUpBody from './schema/SignUpBody.json'
import SignInBody from './schema/LoginBody.json'
import GetUserById from './schema/GetUserById.json'

interface SignUp {
  email: string
  username: string
  password: string
}

interface SignIn {
  email: string
  password: string
}

interface UserById {
  id: number
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
        user.add(
          'email, password, username',
          email,
          cryptSha(password),
          username
        )
        const reg = await user.findOne({ email: email })

        reply.code(200).send({
          suc: true,
          id: reg.id,
          email: reg.email,
          username: reg.username,
          admin: reg.admin.data,
        })
      } else {
        reply.code(200).send({ suc: false, msg: 'Already Exists' })
      }
    }
  )

  /**
   * POST /api/auth/signin
   * handle sign in action
   */
  fastify.post<{ Body: SignIn }>(
    '/signin',
    {
      schema: {
        body: SignInBody,
      },
    },
    async (request, reply) => {
      const {
        body: { email, password },
      } = request

      const pw = cryptSha(password)

      const check = await user.find({ email: email, password: pw })
      if (check.length < 1) {
        reply.code(200).send({ suc: false })
      } else {
        reply.code(200).send({
          suc: true,
          id: check[0].id,
          email: check[0].email,
          username: check[0].username,
          admin: check[0].admin,
        })
      }
    }
  )

  fastify.get<{ Querystring: UserById }>(
    '/getuserbyid',
    {
      schema: {
        querystring: GetUserById,
      },
    },
    async (request, reply) => {
      const {
        query: { id },
      } = request

      const result = (await user.find({ id: id })).map(v => ({
        id: v.id,
        email: v.email,
        admin: v.admin,
        username: v.username,
      }))

      reply.code(200).send(result)
    }
  )

  done()
}

export default authRoute
