import { StatusCodes, ReasonPhrases } from 'http-status-codes'

// Custom dependencies 
import common from '../../src/utils/common.js'
const { catchAsync, sendResponse } = common

export const authenticate = catchAsync(async (req, res, next) => {
  sendResponse(res, StatusCodes.ACCEPTED, req.token, ReasonPhrases.ACCEPTED)
})

export default { authenticate }
