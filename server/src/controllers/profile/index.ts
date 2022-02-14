import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import AppError from '../../errors'

import common from '../../lib/utils/common'
import profileService from '../../services/profile/dataProvider'

const { catchAsync, sendResponse } = common

export default {
  createOne: catchAsync(async (req, res, next) => {
    const profile = await profileService.createProfile(
      req.body.userId,
      req.body
    )

    if (!profile)
      throw new AppError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST)

    return sendResponse(
      res,
      StatusCodes.CREATED,
      { profile },
      ReasonPhrases.CREATED
    )
  }),
  getOne: catchAsync(async (req, res, next) => {}),
  editOne: catchAsync(async (req, res, next) => {}),
  deleteOne: catchAsync(async (req, res, next) => {}),
}
