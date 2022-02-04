import { NextFunction, Request, Response } from 'express'

import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import common from '../../lib/utils/common'
import db from '../../models'

const { catchAsync, sendResponse } = common

export default {
  authenticate: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      db.User.login(
        req.user,
        function (error: Error | null, token: string | undefined) {
          if (error) throw error
          return sendResponse(
            res,
            StatusCodes.ACCEPTED,
            { token, user:req.user },
            ReasonPhrases.ACCEPTED
          )
        }
      )
    }
  ),
}
