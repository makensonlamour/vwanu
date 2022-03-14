import { StatusCodes } from 'http-status-codes';
import { Response, Request } from 'express';
import PostService from '../../services/post/post.service';
import AppError from '../../errors';

// Custom requirements

import common from '../../lib/utils/common';

const { catchAsync, sendResponse } = common;

export const createOne = catchAsync(async (req: Request, res: Response) => {
  try {
    const post = await PostService.createOne(req.body);
    return sendResponse(res, StatusCodes.CREATED, { post }, 'created');
  } catch (error) {
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
// export const editOne = catchAsync(async (req, res) => {})
// export const getOne = catchAsync(async (req, res) => {})
// export const deleteOne = catchAsync(async (req, res) => {})
// export const getAll = catchAsync(async (req, res) => {})
// export const getTimeline = catchAsync(async (req, res) => {})

// editOne, getOne, deleteOne, getAll, getTimeline
export default { createOne };
