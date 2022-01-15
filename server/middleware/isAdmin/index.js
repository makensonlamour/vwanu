const { catchAsync } = require('../helper')
const AppError = require('../errors')

const onlyAdmin = catchAsync(async (req, res, next) => {
  const { user } = req
  if (user?.isAdmin && user?.isActive) return next()
  throw new AppError(
    'You are not authorized to continue with that operation ',
    401
  )
})

module.exports = onlyAdmin
