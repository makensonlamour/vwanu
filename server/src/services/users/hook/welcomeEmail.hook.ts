/* eslint-disable no-underscore-dangle */
import { HookContext } from '@feathersjs/feathers';
import notifier from '../../../lib/utils/messenger';
import Logger from '../../../lib/utils/logger';
import { Application } from '../../../declarations';

export default async (context: HookContext): Promise<HookContext> => {
  const { result, app } = context;
  if (!result) return context; // Error creating a user
  try {
    await notifier(app as Application).notifier('WelcomeSignup', result, {});
  } catch (e) {
    Logger.error(e);
  }
  return context;
};
