import jwt from 'jsonwebtoken'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import common from '../../src/utils/common.js'

const { sendErrorResponse } = common

export default function (req, res, next) {
  const token = req.header('x-auth-token')
  if (!token)
    return sendErrorResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      [{ message: 'Please provide a token' }],
      ReasonPhrases.UNAUTHORIZED
    )

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    return next()
  } catch (e) {
    return sendErrorResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      [{ message: 'Please ensure the server is up' }],
      ReasonPhrases.INTERNAL_SERVER_ERROR
    )
  }
}
