// Dependencies
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
//import dotenv from 'dotenv'
import express from 'express'
import methodOverride from 'method-override'
import testRoute from './routes/test/index.js'
//const isLoggedIn = require('./middleware/authenticate')
// import('./passport')
//dotenv.config()

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
app.use('/test',testRoute)
//app.use('/api/login', require('./routes/auth'))

// app.use('/api/post/', require('./routes/post/index'))

/* Handling all errors */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong ' } = err
  return res.status(status).json({ message })
})


export default app
