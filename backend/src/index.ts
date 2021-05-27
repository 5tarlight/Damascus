import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.set('port', process.env.PORT ?? 5676)

app.route('/').get((req, res) => {
  console.log(req.ip)
  res.end('Hello World')
})

app.listen(app.get('port'), () => {
  console.log(`Server is ready on ${app.get("port")} port`)
})
