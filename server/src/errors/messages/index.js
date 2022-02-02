
const transactions = require('./transactions')
const users = require('./users')

const errors = {
  TRANSACTIONS: transactions,
  USERS: users,
};

module.exports.Paths = {
  USERS: 'user',
  TRANSACTIONS: 'transaction',
};
module.exports.getErrors = (path) => {
  if (!Object.prototype.hasOwnProperty.call(errors, path))
    throw new Error('UNKNOWN PATH');
  return errors[path];
};
