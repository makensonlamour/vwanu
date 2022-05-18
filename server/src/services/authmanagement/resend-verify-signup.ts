import { GeneralError } from '@feathersjs/errors';
import { nanoid } from 'nanoid';
import getUserData from '../../lib/utils/getUserData';

export default async (options, identifyUser, notifierOptions) => {
  const usersService = options.app.service(options.service);
  const usersServiceIdName = usersService.id;

  // Todo check the props are valid

  const users = await usersService.find({ query: identifyUser });
  const user1 = getUserData(users, ['isNotVerified']);

  const user2 = await usersService.patch(user1[usersServiceIdName], {
    verified: false,
    verifyExpires: Date.now() + options.delay,
    activationKey: nanoid(),
    shortActivationKey:nanoid(options.shortTokenLen),
  });
  try {
    await options.notifier('resendVerifySignup', user2, notifierOptions);
    return options.sanitizeUserForClient(user2);
  } catch (error) {
    throw new GeneralError('notifier-error', { error: error.message });
  }
};
