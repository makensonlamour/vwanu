import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Response, Request, NextFunction } from 'express'

// Custom requirements
import AppError from '../../errors'
import common from '../../lib/utils/common'
import userService from '../../services/user/dataProvider'

const { catchAsync, sendResponse, sendErrorResponse } = common

export default {
  createOne: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      userService
        .createUser(req.body, req.body.password)
        .then((user) =>
          userService.loginUser(
            user,
            (err: Error | null, token: string | undefined) => {
              if (!token && err)
                throw new AppError(
                  err.message,
                  StatusCodes.INTERNAL_SERVER_ERROR
                )

              return sendResponse(
                res,
                StatusCodes.CREATED,
                { user, token },
                ReasonPhrases.CREATED
              )
            }
          )
        )
        .catch((err: Error | any) => {
          console.log('Error registering a user')
          throw new AppError(err?.message, StatusCodes.BAD_REQUEST)
        })
    }
  ),
  getOne: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await userService
        .getUser(req.params.id)
        .then((user) =>
          sendResponse(res, StatusCodes.OK, user, ReasonPhrases.OK)
        )
        .catch((error) => {
          throw new AppError(
            error?.message || ReasonPhrases.NOT_FOUND,
            StatusCodes.NOT_FOUND
          )
        })

      return sendResponse(res, StatusCodes.OK, user, ReasonPhrases.OK)
    }
  ),
}
