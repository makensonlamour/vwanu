import { validationResult } from 'express-validator'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

// custom requirements
import common from '../../src/utils/common.js'

const { sendErrorResponse } = common

export default function (req, res, next) {
  const errors = validationResult(req)
  if (errors.isEmpty()) return next()
  return sendErrorResponse(
    res,
    StatusCodes.BAD_REQUEST,
    errors,
    ReasonPhrases.BAD_REQUEST
  )
}
