import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

// custom requirements
import common from '../../lib/utils/common'

const { sendErrorResponse } = common

export default function (req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (errors.isEmpty()) return next()
  return sendErrorResponse(
    res,
    StatusCodes.BAD_REQUEST,
    errors,
    ReasonPhrases.BAD_REQUEST
  )
}
