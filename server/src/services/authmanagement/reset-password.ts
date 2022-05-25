/* eslint-disable no-unused-vars */
import { BadRequest } from '@feathersjs/errors';
import checkUserData from '../../lib/utils/getUserData';

export async function resetPassword(
  options,
  query,
  tokens,
  password,
  notifierOptions = {}
) {
  const usersService = options.app.service(options.service);
  const usersServiceIdName = usersService.id;

  const usersR = await usersService.find({ query });
  const users = usersR.data;

  const checkProps = options.skipIsVerifiedCheck
    ? ['resetNotExpired']
    : ['resetNotExpired', 'isVerified'];

  const user1 = checkUserData(users, checkProps);

  Object.keys(tokens).forEach((key) => {
    if (tokens[key] !== user1[key]) {
      throw new BadRequest('Reset Token is incorrect');
    }
  });

  const user2 = await usersService.patch(user1[usersServiceIdName], {
    password,
    resetExpires: null,
    resetAttempts: null,
    resetToken: null,
    resetShortToken: null,
  });

  try {
    await options.notifier('resetPwd', user2);
    return options.sanitizeUserForClient(user2);
  } catch (error) {
    const user = options.sanitizeUserForClient(user2);
    return {
      user,
      error: error.message,
      extraMessage: 'the notifier failed to send the message',
    };
  }
}

export async function resetPwdWithLongToken(
  options,
  resetPasswordKey,
  password,
  notifierOptions = {}
) {
  //   ensureValuesAreStrings(resetToken, password);

  return resetPassword(
    options,
    { resetPasswordKey },
    { resetPasswordKey },
    password,
    notifierOptions
  );
}

export async function resetPwdWithShortToken(
  options,
  resetShortToken,
  identifyUser,
  password,

  notifierOptions = {}
) {
  //   ensureValuesAreStrings(resetShortToken, password);
  //   ensureObjPropsValid(identifyUser, options.identifyUserProps);

  console.log({
    options,
    resetShortToken,
    identifyUser,
    password,

    notifierOptions,
  });
  return Promise.reject();
  // return resetPassword(
  //   options,
  //   identifyUser,
  //   { resetShortToken },
  //   password,

  //   notifierOptions
  // );
}
