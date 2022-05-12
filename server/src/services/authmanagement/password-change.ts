import { BadRequest } from '@feathersjs/errors';
import comparePasswords from '../../lib/utils/compare-password';
import ensureObjPropsValid from '../../lib/utils/ensure-obj-props-valid';
import ensureValuesAreStrings from '../../lib/utils/ensure-values-are-string';
import getUserData from '../../lib/utils/getUserData';
import hashPassword from '../../lib/utils/hashPassword';

export default async function passwordChange(
  options,
  identifyUser,
  oldPassword,
  password,
  field,
  notifierOptions = {}
) {
  const usersService = options.app.service(options.service);
  const usersServiceIdName = usersService.id;

  ensureValuesAreStrings(oldPassword, password);
  ensureObjPropsValid(identifyUser, options.identifyUserProps);

  const users = await usersService.find({ query: identifyUser });
  const user1 = getUserData(users);

  try {
    await comparePasswords(oldPassword, user1.password, () => {});
  } catch (err) {
    throw new BadRequest('Current password is incorrect.', {
      errors: { oldPassword: 'Current password is incorrect.' },
    });
  }

  const user2 = await usersService.patch(user1[usersServiceIdName], {
    password: await hashPassword(options.app, password, field),
  });

  await options.notifier('passwordChange', user2, notifierOptions);
  return options.sanitizeUserForClient(user2);
}
