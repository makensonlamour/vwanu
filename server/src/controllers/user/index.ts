import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Response, Request, NextFunction } from 'express'

// Custom requirements
import db from '../../models'
import AppError from '../../errors'
import common from '../../lib/utils/common'
import userService from '../../services/user'
import Logger from '../../lib/utils/logger'

const { User } = db
const { catchAsync, sendResponse, sendErrorResponse } = common

export default {
  createOne: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await User.register(req.body, req.body.password)
        User.login(user, (err: Error | null, token: string | undefined) => {
          if (!token && err) {
            Logger.error(err)
            throw new AppError(err?.message, StatusCodes.INTERNAL_SERVER_ERROR)
          }
          Logger.info({user, token})
          Logger.info('New user created')
          sendResponse(
            res,
            StatusCodes.CREATED,
            { user, token },
            ReasonPhrases.CREATED
          )
        })
      } catch (err: any) {
        console.log(err)
        throw new AppError(err.message, err.statusCode)
      }
    }
  ),
  getOne: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await userService.findById(req.params.id)
        console.log(user)
        if (!user)
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            [{ message: 'user not found' }],
            ReasonPhrases.NOT_FOUND
          )
        return sendResponse(res, StatusCodes.OK, user, ReasonPhrases.OK)
      } catch (error) {
        console.error(error)
        return sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          [error],
          ReasonPhrases.INTERNAL_SERVER_ERROR
        )
      }
    }
  ),
}
