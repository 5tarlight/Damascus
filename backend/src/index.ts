import fastify from 'fastify'
import dotenv from 'dotenv'

const server = fastify()
dotenv.config()

server.get('/test', async (req, rep) => {
  return 'test!'
})

server.listen(process.env.PORT || 5676, (err, addr) => {
  if (err) {
    console.error(err)
    process.exit(0)
  }

  console.log(`Server listening at ${addr}`)
})
