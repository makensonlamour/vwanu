const mongoose = require('mongoose')
const merge = require('lodash/merge')

// Custom dependencies
const User = require('../../models/user')
const UserError = require('../../errors/messages/user')
const SystemError = require('../../errors/SystemErrors')
const { catchAsync, savePopulate } = require('../../helper')
// Constants
const requiredFields = []

module.exports.register = catchAsync(async (req, res) => {
  let user = await User.findOne({ username: req.body.username })
  if (user) throw new SystemError(UserError.USERNAME_ALREADY_EXISTS)
  user = await User.register(req.body, req.body.password)
  return res.json(user)
})

module.exports.getOne = catchAsync(async (req, res) => {
  const user = await User.findOneById(req.params.id)
  if (!user) throw new SystemError(UserError.NO_USER_FOUND)
  return res.json(user)
})

module.exports.editOne = catchAsync(async (req, res) => {
  let user = await User.findById(req.params.id)
  if (!user) throw new SystemError(UserError.NO_USER_FOUND)
  user = merge(user, req.body.user)
  return savePopulate(user, requiredFields, res)
})

module.exports.makeAndRemoveAdmin = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) throw new SystemError(UserError.NO_USER_FOUND)
  if (user._id.equals(req.user._id))
    throw new SystemError(UserError.CHANGE_OWN_INFORMATION)
  user.isAdmin = !user.isAdmin
  return savePopulate(user, requiredFields, res)
})
module.exports.removeFollowing = catchAsync(async (req, res) => {
  const user = await User.findById(req.body.user)
  if (!user) throw new SystemError(UserError.NO_USERS_FOUND)

  user.following = user.following.filter((following) => {
    return !following._id.equals(req.body.following)
  })
  const usr = await user
    .save()
    .then((userDetails) => userDetails.populate(requiredFields).execPopulate())
  return res.json(usr)
})

module.exports.addFollowing = catchAsync(async (req, res) => {
  const user = await User.findById(req.body.user)
  if (!user) throw new SystemError(UserError.NO_USER_FOUND)
  if (user.following.includes(req.body.following))
    throw new SystemError(UserError.NO_DUPLICATES_INFO)
  user.following.push(req.body.following)
  const usr = await user
    .save()
    .then((userDetails) => userDetails.populate(requiredFields).execPopulate())
  return res.json(usr)
})
