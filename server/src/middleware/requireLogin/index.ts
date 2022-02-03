require('dotenv').config()
import jwt from 'jsonwebtoken'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Response, Request, NextFunction } from 'express'
import common from '../../lib/utils/common'


const { sendErrorResponse } = common

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token')
  if (!token)
    return sendErrorResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      [{ message: 'Please provide a token' }],
      ReasonPhrases.UNAUTHORIZED
    )

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)
    req.user = (<any>decoded).user
    return next()
  } catch (e) {
    console.error({ error: e })
    if ('invalid signature' === e)
      return sendErrorResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        [{ message: e }],
        ReasonPhrases.UNAUTHORIZED
      )
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      [{ message: 'Please ensure the server is up' }],
      ReasonPhrases.INTERNAL_SERVER_ERROR
    )
  }
}
