import { Response, Request, NextFunction } from 'express'
export default function (req: Request, res: Response, next: NextFunction) {
  if ('production' === process.env.NODE_ENV) return
  console.log({ body: req.body })
  return next()
}
