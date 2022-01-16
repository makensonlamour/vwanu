let Common = {
  getTokenFromRequest: async (request) => {
    let token = request.headers['x-auth-token']
    if (!token) token = null
    return token
  },

  catchAsync: (fn) =>
    function (req, res, next) {
      fn(req, res, next).catch((err) => next(err))
    },

  sendResponse: (response, statusCode, data, message) => {
    response.status(statusCode).json({
      status: 'ok',
      data: data,
      message: message,
    })
  },
  _formatError: (errors) => {
    if (!Array.isArray(errors))
      throw new Error('Errors must be an array or a function')
    return errors.map((error) => ({
      msg: error.hasOwnProperty('message')
        ? error.message
        : 'Really confusing error',
      ...error,
    }))
  },
  sendErrorResponse: (response, statusCode, errors, message) => {
    const errorFormat = errors?.array
      ? errors.array()
      : Common._formatError(errors)
    response.status(statusCode).json({
      status: 'failure',
      errors: errorFormat,
      message: message,
    })
  },
}

export default Common
