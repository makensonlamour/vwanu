const { BadRequest } = require('@feathersjs/errors');

export default (data, checks = []) => {
  if (Array.isArray(data) ? data.length === 0 : data.total === 0) {
    throw new BadRequest('User not found.');
  }

  const users = Array.isArray(data) ? data : data.data || [data];
  const user = users[0];

  if (users.length !== 1) {
    throw BadRequest('More than 1 user selected.');
  }

  if (checks.includes('isNotVerified') && user.isVerified) {
    throw BadRequest('User is already verified.');
  }

  if (
    checks.includes('isNotVerifiedOrHasVerifyChanges') &&
    user.isVerified &&
    !Object.keys(user.verifyChanges || {}).length
  ) {
    throw new BadRequest('User is already verified & not awaiting changes');
  }

  if (checks.includes('isVerified') && !user.verified) {
    throw new BadRequest('User is not verified.');
  }

  if (checks.includes('verifyNotExpired') && user.verifyExpires < Date.now()) {
    throw new BadRequest('Verification token has expired.');
  }

  if (checks.includes('resetNotExpired') && user.resetExpires < Date.now()) {
    throw new BadRequest('Password reset token has expired.');
  }

  return user;
};
