// Dependencies
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const methodOverride = require('method-override')
//const isLoggedIn = require('./middleware/authenticate')
require('./passport')

const app = express()
app.use(express.json({ extended: false }))

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

// connecting to database

app.use((req, res, next) => {
  if ('production' === process.env.NODE_ENV) return
  console.log({ path: req.path, body: req.body })
  return next()
})
//app.use(isLoggedIn)

// Serving the routes
//app.use('/api/login', require('./routes/auth'))
app.get('/', function (req, res) {
  res.sendfile('./pages/index.html')
})
/* Handling all errors */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong ' } = err
  return res.status(status).json({ message })
})

module.exports = app
