import { nanoid } from 'nanoid';
import { BadRequest } from '@feathersjs/errors';
import comparePasswords from '../../lib/utils/compare-password';
import ensureObjPropsValid from '../../lib/utils/ensure-obj-props-valid';
import getUserData from '../../lib/utils/getUserData';

export default async function identityChange(
  options,
  identifyUser,
  password,
  changesIdentifyUser,
  notifierOptions = {}
) {
  const usersService = options.app.service(options.service);
  const usersServiceIdName = usersService.id;

  ensureObjPropsValid(identifyUser, options.identifyUserProps);
  ensureObjPropsValid(changesIdentifyUser, options.identifyUserProps);

  const users = await usersService.find({ query: identifyUser });
  const user1 = getUserData(users);

  try {
    await comparePasswords(password, user1.password, () => {});
  } catch (err) {
    throw new BadRequest('Password is incorrect.', {
      errors: { password: 'Password is incorrect.', $className: 'badParams' },
    });
  }

  const user2 = await usersService.patch(user1[usersServiceIdName], {
    verifyExpires: Date.now() + options.delay,
    verifyToken: nanoid(options.longTokenLen),
    verifyShortToken: nanoid(options.shortTokenLen),
    verifyChanges: changesIdentifyUser,
  });

  await options.notifier('identityChange', user2, notifierOptions);
  return options.sanitizeUserForClient(user2);
}
