/* eslint-disable no-underscore-dangle */
import { HookContext } from '@feathersjs/feathers';
import Notifier from '../../../lib/utils/notifier/not';
import { EmailerService } from '../../../lib/utils/outReach';

import Logger from '../../../lib/utils/logger';

export default async (context: HookContext): Promise<HookContext> => {
  const { result, app } = context;
  if (!result) return context; // Error creating a user

  try {
    const res = await app
      .service('template')
      ._find({ query: { snug: 'WelcomeSignup' }, paginate: false });
    if (!res) {
      Logger.error('Welcome template not found');
      throw new Error('Welcome not found');
    }

    const notifierInstance = new Notifier(EmailerService());
    const { email, activationKey, firstName, lastName, id } = result;

    const to = email;
    const templateId = res[0].id;
    notifierInstance.sendTemplate(to, templateId, {
      id,
      firstName,
      lastName,
      activationKey,
    });
  } catch (error) {
    Logger.error(error);
    throw new Error(error);
  }

  return context;
};
