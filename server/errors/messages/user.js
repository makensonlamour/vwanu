const { StatusCodes } = require('http-status-codes');

module.exports = {
  USERNAME_ALREADY_EXISTS: {
    message: 'A User with this username already exists',
    status: StatusCodes.CONFLICT,
  },

  NO_USERS_FOUND: {
    message: 'No users found in the database',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
  USER_NOT_FOUND: {
    message: 'No user found for the specified arguments',
    status: StatusCodes.NOT_FOUND,
  },

  CHANGE_OWN_INFORMATION: {
    message: 'Not authorize to change your own information',
    status: StatusCodes.FORBIDDEN,
  },

  NO_DUPLICATES_INFO: {
    message: 'Establishment Already Added',
    status: StatusCodes.CONFLICT,
  },
};
