/* eslint-disable no-console */
const mongoose = require('mongoose')
const AppError = require('../../errors')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

// custom dependencies
const { catchAsync, tokenizeObject } = require('../../src/utils/helper')

const toObjectId = mongoose.Types.ObjectId

module.exports.login = catchAsync(async (req, res) => {
  if (!req.user?.isActive)
    throw new AppError('Your account is disabled', StatusCodes.UNAUTHORIZED)
  return tokenizeObject(
    {
      ...req.user,
    },

    ({ message }) => {
      throw new AppError(message, 500)
    },
    (token) => res.json({ token })
  )

  throw new AppError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
})

module.exports.forgotPasswordForm = (req, res) =>
  res.json({ msg: 'auth/forgot-password' })

module.exports.lockScreen = (req, res) => res.json({ msg: 'auth/lockScreen' })
module.exports.recoverPassword = (req, res) =>
  res.json({ msg: 'auth/recover-password' })
module.exports.register = (req, res) => res.json({ msg: 'auth/register' })

module.exports.register = (req, res) => res.json({ msg: 'auth/register' })

module.exports.logout = (req, res) => {
  res.cookie('name', 'cookie')
  return res.json({ msg: 'Logged Out ' })
}
module.exports.loginForm = (req, res) => {
  res.cookie('name', 'cookie')
  return res.json({ msg: 'Your Login form Baby' })
}
