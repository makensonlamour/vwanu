// Dependencies
import './passport.ts'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import express from 'express'
import common from './lib/utils/common'
import methodOverride from 'method-override'
//import authRoute from './routes/auth'
import userRoute from './routes/user'
import RequestBody from './middleware/RequestBody'
dotenv.config()
const { sendErrorResponse } = common

export default async function (database: any) {
  if (!database) throw new Error('No database specified')
  const app = express()
  app.use(express.json())

  app.use(cors())
  app.use(helmet())
  app.use(RequestBody)
  app.use(morgan('dev'))
  app.use(methodOverride('_method'))
  app.use(express.urlencoded({ extended: true }))

  //  connect to the database
  await database.sequelize.sync({ force: true })
  // Serving the routes
  //app.use('/api/auth', authRoute)
  app.use('/api/user', userRoute)

  /* Handling all errors */
  // eslint-disable-next-line no-unused-vars
  app.use(function (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { status = 500, message = 'Something went wrong ' } = err
    res.status(status).json({ message })
  })

  return app
}
