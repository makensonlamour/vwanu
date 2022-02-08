import { StatusCodes } from 'http-status-codes'
import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

// custom requirements

export default function (req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  if (errors.isEmpty()) return next()

  return next({ status: StatusCodes.BAD_REQUEST, errors: errors.array() })
}
