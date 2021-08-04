const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()

app.use(cors())
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
