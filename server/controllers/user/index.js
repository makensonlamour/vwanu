import { ReasonPhrases, StatusCodes } from 'http-status-codes'

// Custom requirements
import userService from '../../services/user/index.js'
import common from '../../src/utils/common.js'
import AppError from '../../errors/index.js'
import User from '../../models/user.js'

const { catchAsync, sendResponse, sendErrorResponse } = common

export default {
  createOne: catchAsync(async (req, res, next) => {
    try {
      const user = await User.register(req.body, req.body.password)
      sendResponse(res, StatusCodes.CREATED, user, ReasonPhrases.CREATED)
    } catch (err) {
      console.log(err)
      throw new AppError(err.message, err.statusCode)
    }
  }),
  getOne: catchAsync(async (req, res, next) => {
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
  }),
}
