/* eslint-disable no-unused-vars */
import { BadRequest } from '@feathersjs/errors';
import ensureObjPropsValid from '../../lib/utils/ensure-obj-props-valid';
import ensureValuesAreStrings from '../../lib/utils/ensure-values-are-string';
import getUserData from '../../lib/utils/getUserData';

export async function verifySignup(
  options,
  query,
  tokens,
  notifierOptions = {}
) {

  const usersService = options.app.service(options.service);
  const usersServiceIdName = usersService.id;

  const users = await usersService.find({ query });
  
  const user1 = getUserData(users, [
    'isNotVerifiedOrHasVerifyChanges',
    'verifyNotExpired',
  ]);


  async function eraseVerifyProps(user, verified, verifyChanges = {}) {
    const patchToUser = {
      ...(verifyChanges || {}),
      verified,
      activationKey: null,
      shortActivationKey: null,
      verifyExpires: null,
      verifyChanges: {},
    };

    const result = await usersService.patch(
      user[usersServiceIdName],
      patchToUser,
      {}
    );
    return result;
  }

  if (!Object.keys(tokens).every((key) => tokens[key] === user1[key])) {
    await eraseVerifyProps(user1, user1.verified);

    throw new BadRequest('Invalid token. Get for a new one.');
  }

  const user2 = await eraseVerifyProps(user1, true, user1.verifyChanges || {});

  try {
    await options.notifier('verifySignup', user2);
    return options.sanitizeUserForClient(user2);
  } catch (error) {
    return {
      user: options.sanitizeUserForClient(user2),
      error: error.message,
      extraMessage: 'The server failed to send the confirmation email',
    };
  }
}
export async function verifySignupWithLongToken(
  options,
  activationKey,
  notifierOptions = {}
) {
  ensureValuesAreStrings(activationKey);

  const result = await verifySignup(
    options,
    { activationKey },
    { activationKey },
    notifierOptions
  );
  return result;
}

export async function verifySignupWithShortToken(
  options,
  verifyShortToken,
  identifyUser,
  notifierOptions = {}
) {
  ensureValuesAreStrings(verifyShortToken);
  ensureObjPropsValid(identifyUser, options.identifyUserProps);

  const result = await verifySignup(
    options,
    identifyUser,
    { verifyShortToken },
    notifierOptions
  );
  return result;
}
