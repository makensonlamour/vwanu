import { ReasonPhrases, StatusCodes } from 'http-status-codes'

// Custom requirements
import User from '../../models/user.js'
import AppError from '../../lib/errors/index.js.js'
import common from '../../lib/utils/common.js'
import postService from '../../services/user/index.js'

const Post = {}
const { catchAsync, sendResponse } = common

export const createOne = catchAsync(async (req, res) => {
  try {
    //const post = await postService.createPost()
    const post={}
    return sendResponse(res, StatusCodes.CREATED, post, )
  } catch (error) {}
})
export const editOne = catchAsync(async (req, res) => {})
export const getOne = catchAsync(async (req, res) => {})
export const deleteOne = catchAsync(async (req, res) => {})
export const getAll = catchAsync(async (req, res) => {})
export const getTimeline = catchAsync(async (req, res) => {})

export default { createOne, editOne, getOne, deleteOne, getAll, getTimeline }
