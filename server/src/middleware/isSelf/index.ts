import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Response, Request, NextFunction } from 'express'
import common from '../../lib/utils/common'

const { sendErrorResponse } = common

export default function (req: Request, res: Response, next: NextFunction) {
  console.log(req.params.id.toString()=== (<any>req.user).id.toString())
  if ((<any>req.user).id.toString() !== req.params.id.toString())
    return sendErrorResponse(
      res,
      StatusCodes.UNAUTHORIZED,
      [{ message: 'not your account' }],
      ReasonPhrases.UNAUTHORIZED
    )
  return next()
}
