import merge from 'lodash/merge'

// Custom dependencies
import User from '../../models/user'
import Profile from '../../models/profile'
import common from '../../src/utils/common.js'

const { catchAsync } = common

export const getOne = catchAsync(async function (req, res, next) {})

export const editOne = catchAsync(async function (req, res, next) {})
export const makeAndRemoveAdmin = catchAsync(async function (req, res, next) {})

export const removeFollowing = catchAsync(async function (req, res, next) {})
export const addFollowing = catchAsync(async function (req, res, next) {})

export default {
  removeFollowing,
  addFollowing,
  makeAndRemoveAdmin,
  getOne,
  editOne,
}
