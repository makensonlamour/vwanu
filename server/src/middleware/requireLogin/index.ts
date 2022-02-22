import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import common from '../../lib/utils/common'

require('dotenv').config()

const { catchAsync } = common
export default catchAsync(
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('x-auth-token')
      if (!token)
        return next({
          message: StatusCodes.UNAUTHORIZED,
          status: ReasonPhrases.UNAUTHORIZED,
        })

      jwt.verify(
        token,
        process.env.JWT_SECRET as jwt.Secret,
        (err, decoded) => {
          if (err && !decoded)
            return next({ ...err, status: StatusCodes.UNAUTHORIZED })
          req.user = (<any>decoded).user
          return next()
        }
      )
    } catch (e) {
      return next({ ...e, status: StatusCodes.INTERNAL_SERVER_ERROR })
    }
  }
)
