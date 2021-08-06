import { createTransport } from 'nodemailer'

const service = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'developerstarlight@gmail.com',
    pass: 'kgm030115**',
  },
})

export default service
