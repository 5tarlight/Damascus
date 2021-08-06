import { FastifyPluginCallback } from 'fastify'
import { profile, user } from '../Database'
import { cryptSha, emailRegexp } from '../util'
import SignUpBody from './schema/SignUpBody.json'
import SignInBody from './schema/LoginBody.json'
import GetUserById from './schema/GetUserById.json'
import UpdateBody from './schema/UpdateUser.json'
import GetVerifyEmailBody from './schema/GetVerifyEmail.json'
import { Bit } from '../types/type'
import emailService from '../email'
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
  id: string
}

interface GetUser {
  id: string
  email: string
  username: string
  admin: Bit
  profile: string
  bio: string
  email_verify: Bit
}

interface Update {
  id: string
  update: 'email' | 'username' | 'bio' | 'profile' | 'email_verify'
  value: string
}

interface VerifyEmail {
  email: string
}

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', {}, async (req, res) => {
    res.send({
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
      try {
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

          await profile.add('id', reg.id)

          reply.code(200).send({
            suc: true,
            id: reg.id,
            email: reg.email,
            username: reg.username,
            admin: reg.admin,
          })
        } else {
          reply.code(200).send({ suc: false, msg: 'Already Exists' })
        }
      } catch (e) {
        console.log(e)
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
      try {
        const {
          body: { email, password },
        } = request

        const pw = cryptSha(password)

        const check = await user.find({ email: email, password: pw })
        if (check.length < 1) {
          reply.code(200).send({ suc: false })
        } else {
          const p = await profile.findOne({ id: check[0].id })

          reply.code(200).send({
            suc: true,
            id: check[0].id,
            email: check[0].email,
            username: check[0].username,
            admin: check[0].admin,
            bio: p.bio,
            profile: p.profile,
            email_verify: check[0].email_verify,
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  )

  const getUser = async (id: string) => {
    const result: GetUser[] = []

    const a = await user.find({ id: id })

    for (let i = 0; i < a.length; i++) {
      const p = await profile.findOne({ id: id })

      result.push({
        id: a[i].id,
        email: a[i].email,
        admin: a[i].admin,
        username: a[i].username,
        profile: p.profile,
        bio: p.bio,
        email_verify: a[i].email_verify,
      })
    }

    return result
  }

  /**
   * GET /api/auth/getuserbyid
   * return user from database fit to id
   */
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

      const result = await getUser(id)

      reply.code(200).send(result)
    }
  )

  /**
   * POST /api/auth/update
   * modify user's profile or something
   */
  fastify.post<{ Body: Update }>(
    '/update',
    {
      schema: {
        body: UpdateBody,
      },
    },
    async (req, res) => {
      const { id, update, value } = req.body
      let updateCon = { [update]: value }

      // switch (update) {
      //   case 'email':
      //     updateCon = {
      //       email: value,
      //     }
      //     break
      //   case 'username':
      //     updateCon = {
      //       username: value,
      //     }
      //     break
      //   default:
      //     res.code(400).send({ msg: 'bad update type' })
      //     return
      // }

      const has = (await user.find({ id: id })).length > 0
      if (!has) {
        res.code(400).send({ msg: 'no user with that id' })
        return
      }

      if (update === 'email' || update === 'username') {
        if (update === 'email')
          user.update([{ id: id }], [updateCon, { email_verify: 0 }])
        else user.update([{ id: id }], [updateCon])
      } else if (update === 'email_verify') {
        user.update([{ id }], [{ email_verify: parseInt(value) }])
      } else {
        profile.update([{ id: id }], [updateCon])
      }

      const users = await getUser(id)
      res.code(200).send({
        msg: 'success',
        user: users,
      })
    }
  )

  const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  /**
   * POST /api/auth/verifyemail
   * modify user's profile or something
   */
  fastify.post<{ Body: VerifyEmail }>(
    '/verifyemail',
    {
      schema: {
        body: GetVerifyEmailBody,
      },
    },
    (req, res) => {
      const {
        body: { email },
      } = req

      if (!emailRegexp.test(email)) {
        res.send({
          success: false,
          msg: 'email is not fit to RegExp',
        })
        return
      }

      const number = getRandom(111111, 999999)

      const mailOptions = {
        from: 'Damascus',
        to: email,
        subject: '[Damascus] 인증 메일',
        text: '오른쪽 숫자 6자리를 입력해주세요 : ' + number,
      }

      emailService.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log(err)

          res.code(503).send({
            success: false,
            msg: 'Something wrong with email api',
          })
          return
        }

        res.code(200).send({
          success: true,
          msg: '',
          verify: number,
        })
      })
    }
  )

  done()
}

export default authRoute
