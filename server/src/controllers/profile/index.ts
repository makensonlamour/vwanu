/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

// Local dependencies
import AppError from '../../errors';
import common from '../../lib/utils/common';
import profileService from '../../services/profile/dataProvider';

import { CreateProfileInput } from '../../schema/profile';

const { catchAsync, sendResponse } = common;
interface MulterRequest extends Request {
  files: any;
}
export default {
  createOne: catchAsync(
    async (
      req: Request<
        CreateProfileInput['params'],
        {},
        CreateProfileInput['body']
      >,
      res: Response
    ) => {
      const { userId, ...data } = req.body;

      const documentFiles = (req as MulterRequest).files;
      if (documentFiles.profilePicture || documentFiles.coverPicture) {
        const photosArray = ['profilePicture', 'coverPicture'];
        photosArray.forEach((photoGroup) => {
          if (documentFiles[photoGroup])
            data[photoGroup] = documentFiles[photoGroup][0].path;
        });
      }
      const profile = await profileService.createProfile(userId, data);

      if (!profile)
        throw new AppError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);

      return sendResponse(
        res,
        StatusCodes.CREATED,
        { profile },
        ReasonPhrases.CREATED
      );
    }
  ),
  getOne: catchAsync(async (req, res, next) => {}),
  editOne: catchAsync(async (req, res, next) => {}),
  deleteOne: catchAsync(async (req, res, next) => {}),
};
