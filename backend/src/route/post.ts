import { FastifyPluginCallback } from 'fastify'
import { post, user } from '../Database'
import WriteBody from './schema/WriteBody.json'
import GetPostBOdy from './schema/GetPostBody.json'
import GetUserPostQueryString from './schema/GetUserPost.json'

interface Write {
  author: string
  title: string
  content: string
  description?: string
  published?: boolean
  tag: string
}

interface GetPost {
  id: number
}

interface GetUserPost {
  author: string
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
      const {
        author,
        title,
        content,
        description,
        published = false,
        tag,
      } = request.body
      const isAuthorValid = (await user.find({ id: author })).length > 0

      if (!isAuthorValid) {
        reply.code(401).send({
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
        'author, title, content, description, published, tag',
        author,
        title,
        content,
        description,
        published ? 1 : 0,
        tag
      )

      const { id } = await post.findOne({ title })
      reply.code(200).send({
        message: 'Post created',
        id,
      })
    }
  )

  // POST api/auth/postid
  server.post<{ Body: GetPost }>(
    '/postid',
    {
      schema: {
        body: GetPostBOdy,
      },
    },
    async (request, reply) => {
      const { id } = request.body
      const foundPost = await post.findOne({ id })

      if (!foundPost) {
        reply.code(400).send({
          message: 'Post not found',
        })
        return
      }

      const {
        id: postId,
        author,
        title,
        content,
        tag,
        description,
        like,
        published,
        created_at,
        updated_at,
      } = foundPost
      const authorUser = await user.findOne({ id: author })
      let username = ''

      if (!authorUser) username = 'unknwon'
      else username = authorUser.username

      reply.code(200).send({
        message: 'post found',
        id: postId,
        author,
        username,
        title,
        tag,
        content,
        description,
        like,
        published,
        created_at: `${created_at.getFullYear()}.${
          created_at.getMonth() + 1
        }.${created_at.getDate()}`,
        updated_at: `${updated_at.getFullYear()}.${
          updated_at.getMonth() + 1
        }.${updated_at.getDate()}`,
      })
    }
  )

  // GET /api/post/user
  server.get<{ Querystring: GetUserPost }>(
    '/user',
    {
      schema: {
        querystring: GetUserPostQueryString,
      },
    },
    async (request, reply) => {
      const {
        query: { author },
      } = request

      const posts = await post.find({ author })
      reply.code(200).send({
        message: 'posts found',
        posts: posts.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          tag: p.tag,
        })),
      })
    }
  )

  next()
}

export default postRoute
