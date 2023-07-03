import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import Logger from '../../../lib/utils/logger';

export default async (context: HookContext): Promise<HookContext> => {
  const { data } = context;

  if (!data.workPlace) return context;

  const { app } = context;

  try {
    await app.service('workplace').create(data.workPlace);
  } catch (err) {
    Logger.error(err);
    throw new BadRequest('Error saving workplace');
  }

  return context;
};
