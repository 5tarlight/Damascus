import { FastifyPluginCallback } from 'fastify'
import { post, user } from '../Database'
import WriteBody from './schema/WriteBody.json'

interface Write {
  author: string
  title: string
  content: string
  published: boolean
}

const postRoute: FastifyPluginCallback = async (server, opts, next) => {
  // GET /api/post
  server.get('/', async (request, reply) => {
    reply.send({
      message: 'Damascus post api',
    })
  })

  // POST /api/post/write
  server.post<{ Body: Write }>(
    '/write',
    {
      schema: {
        body: WriteBody,
      },
    },
    async (request, reply) => {
      const { author, title, content, published = false } = request.body
      const isAuthorValid = (await user.find({ id: author })).length > 0

      if (!isAuthorValid) {
        reply.code(400).send({
          message: 'Author is not valid',
        })
        return
      }

      const dupPost = (await post.find({ title, author })).length > 0

      if (dupPost) {
        reply.code(400).send({
          message: 'Post already exists',
        })
        return
      }

      post.add(
        'author, title, content, published',
        author,
        title,
        content,
        published ? 1 : 0
      )

      const { id } = await post.findOne({ title })
      reply.code(200).send({
        message: 'Post created',
        id,
      })
    }
  )

  next()
}

export default postRoute
