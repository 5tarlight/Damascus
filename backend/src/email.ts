import { createTransport } from 'nodemailer'

const service = createTransport({
  name: 'Damascus',
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PW,
  },
})

export default service
