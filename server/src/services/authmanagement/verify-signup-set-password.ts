import { BadRequest } from '@feathersjs/errors';
import * as local from '@feathersjs/authentication-local';
import getUserData from '../../lib/utils/getUserData';

const { hashPassword } = local.hooks;

export async function verifySignupSetPassword(
  options,
  query,
  tokens,
  password,
  field,
  notifierOptions = {}
) {
  const usersService = options.app.service(options.service);
  const usersServiceIdName = usersService.id;

  const users = await usersService.find({ query });
  const user1 = getUserData(users, [
    'isNotVerifiedOrHasVerifyChanges',
    'verifyNotExpired',
  ]);

  async function eraseVerifyProps(user, isVerified, verifyChanges) {
    const patchToUser = {
      ...(verifyChanges || {}),
      isVerified,
      verifyToken: null,
      verifyShortToken: null,
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

  // eslint-disable-next-line no-unused-vars
  async function eraseVerifyPropsSetPassword(
    user,
    isVerified,
    verifyChanges,
    pass
  ) {
    const hashedPassword = await hashPassword(options.app, pass);

    const patchToUser = {
      ...(verifyChanges || {}),
      isVerified,
      verifyToken: null,
      verifyShortToken: null,
      verifyExpires: null,
      verifyChanges: {},
      password: hashedPassword,
    };

    const result = await usersService.patch(
      user[usersServiceIdName],
      patchToUser,
      {}
    );
    return result;
  }

  if (!Object.keys(tokens).every((key) => tokens[key] === user1[key])) {
    await eraseVerifyProps(user1, user1.isVerified, {});
    throw new BadRequest('Invalid token. Get for a new one. (authLocalMgnt)');
  }

  const user2 = await eraseVerifyPropsSetPassword(
    user1,
    user1.verifyExpires > Date.now(),
    user1.verifyChanges || {},
    password,

  );

  const user3 = await (options.notifier,
  'verifySignupSetPassword',
  user2,
  notifierOptions);
  return options.sanitizeUserForClient(user3);
}

export async function verifySignupSetPasswordWithLongToken(
  options,
  verifyToken,
  password,
  field,
  notifierOptions = {}
) {
  //   ensureValuesAreStrings(verifyToken, password);
  const result = await verifySignupSetPassword(
    options,
    { verifyToken },
    { verifyToken },
    password,
    field,
    notifierOptions
  );
  return result;
}

export async function verifySignupSetPasswordWithShortToken(
  options,
  verifyShortToken,
  identifyUser,
  password,
  field,
  notifierOptions = {}
) {
  //   ensureValuesAreStrings(verifyShortToken, password);
  //   ensureObjPropsValid(identifyUser, options.identifyUserProps);

  const result = await verifySignupSetPassword(
    options,
    identifyUser,
    {
      verifyShortToken,
    },
    password,
    field,
    notifierOptions
  );
  return result;
}
