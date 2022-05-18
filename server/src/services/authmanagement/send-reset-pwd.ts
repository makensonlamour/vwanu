/* eslint-disable no-unused-vars */
import { GeneralError } from '@feathersjs/errors';
import { nanoid } from 'nanoid';
import checkUserData from '../../lib/utils/getUserData';
import hashPassword from '../../lib/utils/hashPassword';
import ensureObjPropsValid from '../../lib/utils/ensure-obj-props-valid';

const concatIDAndHash = (id, token) => `${id}___${token}`;

export default async function sendResetPwd(
  options,
  identifyUser,
  field,
  notifierOptions = {}
) {
  const usersService = options.app.service(options.service);
  const usersServiceIdName = usersService.id;

  ensureObjPropsValid(identifyUser, options.identifyUserProps);

  const users = await usersService.find({ query: identifyUser });
  const user1 = checkUserData(
    users,
    options.skipIsVerifiedCheck ? [] : ['isVerified']
  );

  if (
    // Use existing token when it's not hashed,
    options.reuseResetPasswordKey &&
    user1.resetPasswordKey &&
    user1.resetPasswordKey.includes('___') &&
    // and remaining time exceeds half of resetDelay
    user1.resetExpires > Date.now() + options.resetDelay / 2
  ) {
    try {
      await options.notifier('sendResetPwd', user1);
      return options.sanitizeUserForClient(user1);
    } catch (error) {
      throw new GeneralError('notifier-error', { error: error.message });
    }
  }

  const user2 = Object.assign(user1, {
    resetExpires: Date.now() + options.resetDelay,
    resetAttempts: options.resetAttempts,
    resetPasswordKey: concatIDAndHash(user1[usersServiceIdName], nanoid()),
    resetShortPasswordKey: nanoid(options.shortTokenLen),
  });
  try {
    await options.notifier('sendResetPwd', user2);

    const user3 = await usersService.patch(user2[usersServiceIdName], {
      resetExpires: user2.resetExpires,
      resetAttempts: user2.resetAttempts,
      resetPasswordKey: options.reuseResetPasswordKey
        ? user2.resetPasswordKey
        : await hashPassword(options.app, user2.resetPasswordKey, field),
      resetShortPasswordKey: options.reuseResetPasswordKey
        ? user2.resetShortPasswordKey
        : await hashPassword(options.app, user2.resetShortPasswordKey, field),
    });
    return options.sanitizeUserForClient(user3);
  } catch (error) {
    throw new GeneralError('notifier-error', { error: error.message });
  }
}
