import _ from 'lodash';

export default (givenUser) => {
  const user = _.cloneDeep(givenUser);
  const sensitiveFields = [
    'password',
    'verifyExpires',
    'verifyToken',
    'verifyShortToken',
    'verifyChanges',
    'resetExpires',
    'resetToken',
    'resetShortToken',
  ];
  return _.omit(user, sensitiveFields);
};
