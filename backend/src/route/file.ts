import { FastifyPluginCallback } from 'fastify'

const fileRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', {}, async (req, res) => {
    res.send({
      msg: 'Damascus File Protocol',
    })
  })

  done()
}

export default fileRoute
