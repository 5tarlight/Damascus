const express = require('express')
const cors = require('cors')
const multer = require('multer')
const helmet = require('helmet')
// const csrf = require('csurf')
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')
// const bodyParser = require('body-parser')

// const scrfProtection = scrf({ cookie: false })
const app = express()

// app.use(cookieParser())
// app.use(
//   session({ secret: 'keyboard cat', resave: false, saveUninitialized: true })
// )
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())
// app.use(
//   cookieSession({
//     name: 'session',
//     keys: ['d', 'c'],
//   })
// )

// app.use(csrf({ cookie: true }))
// app.use((req, res, next) => {
//   const token = req.csrfToken()
//   res.cookie('XSRF-TOKEN', token)
//   res.locals.csrfToken = token
//   next()
// })

// const scrfProtection = scrf({ sessionKey: 'session' })
app.disable('x-powered-by')

app.use(cors())
app.use(helmet())
app.use('/', express.static(`${__dirname}/files`))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files/profile/')
  },
  filename: (req, file, cb) => {
    // cb(null, `${req.body.id}_${file.originalname}`)
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage }).single('profile_img')

app.post('/profile/image', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err })
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    })
  })
})

app.get('/', (req, res) => {
  res.end('damascus file server')
})

app.listen(5677, () => {
  console.log('file server is on port 5677')
})
