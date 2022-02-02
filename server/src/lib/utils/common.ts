import { Response, Request, NextFunction } from 'express'
let Common = {
  getTokenFromRequest: async (request: Request) => {
    const token = request.headers['x-auth-token']
    if (!token) return null
    return token
  },

  catchAsync: (fn: Function) =>
    function (req: Request, res: Response, next: NextFunction) {
      fn(req, res, next).catch((err:any) => next(err))
    },

  sendResponse: (
    response: Response,
    statusCode: number,
    data: any,
    message: string
  ) => {
    response.status(statusCode).json({
      status: 'ok',
      data: data,
      message: message,
    })
  },
  _formatError: (errors: Function | any) => {
    if (!Array.isArray(errors))
      throw new Error('Errors must be an array or a function')
    return errors.map((error) => ({
      msg: error.hasOwnProperty('message')
        ? error.message
        : 'Really confusing error',
      ...error,
    }))
  },
  sendErrorResponse: (
    response: Response,
    statusCode: number,
    errors: any|Function,
    message: string
  ) => {
    const errorFormat = errors?.array
      ? errors.array()
      : Common._formatError(errors)
    response.status(statusCode).json({
      status: 'failure',
      errors: errorFormat,
      message: message,
    })
  },
}

export default Common
