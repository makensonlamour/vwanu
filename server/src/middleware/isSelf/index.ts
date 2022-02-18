import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Response, Request, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
  // console.log(req.params.id.toString() === (<any>req.user).id.toString())
  if ((<any>req.user).id.toString() !== req.params.id.toString())
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: ReasonPhrases.UNAUTHORIZED,
    })
  return next()
}
