// Dependencies
import './passport.js'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import express from 'express'
import methodOverride from 'method-override'
import authRoute from './routes/auth/index.js'
import userRoute from './routes/user/index.js'
import RequestBody from './middleware/RequestBody/index.js'
dotenv.config()

const app = express()
app.use(express.json({ extended: false }))

app.use(cors())
app.use(helmet())
app.use(RequestBody)
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

// Serving the routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

/* Handling all errors */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong ' } = err
  return res.status(status).json({ message })
})

export default app
