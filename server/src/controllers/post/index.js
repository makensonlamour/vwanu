import { StatusCodes } from 'http-status-codes';

// Custom requirements

import common from '../../lib/utils/common.js';

const { catchAsync, sendResponse } = common;

export const createOne = catchAsync(async (req, res) => {
 
  try {
    const post = {};
    return sendResponse(res, StatusCodes.CREATED, post);
  } catch (error) {
    return null;
  }
});
// export const editOne = catchAsync(async (req, res) => {})
// export const getOne = catchAsync(async (req, res) => {})
// export const deleteOne = catchAsync(async (req, res) => {})
// export const getAll = catchAsync(async (req, res) => {})
// export const getTimeline = catchAsync(async (req, res) => {})

// editOne, getOne, deleteOne, getAll, getTimeline
export default { createOne };
