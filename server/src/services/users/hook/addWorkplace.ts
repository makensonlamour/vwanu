import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import Logger from '../../../lib/utils/logger';

export default async (context: HookContext): Promise<HookContext> => {
  const { data } = context;

  if (!data.workPlace) return context;

  const { app } = context;

  try {
    const sequelizeClient = app.get('sequelizeClient');

    const { WorkPlace, UserWorkPlace } = sequelizeClient.models;

    const [{ id: WorkPlaceId }] = await WorkPlace.findOrCreate({
      where: { name: data.workPlace.name },
    });

    await UserWorkPlace.findOrCreate({
      where: {
        UserId: context.result.id,
        WorkPlaceId,
      },
      defaults: {
        ...data.workPlace,
      },
    });
  } catch (err) {
    Logger.error(err);
    throw new BadRequest('Error saving workplace');
  }

  return context;
};
