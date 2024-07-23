import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

import Logger from '../../../lib/utils/logger';

export default async (context: HookContext): Promise<HookContext> => {
  const { data } = context;
  if (!data.workPlace) throw new BadRequest('No workplace provided');
  const { app } = context;

  try {
    const sequelizeClient = app.get('sequelizeClient');
    const { WorkPlace, UserWorkPlace } = sequelizeClient.models;

    const [{ id: oldWorkplaceId }] = await WorkPlace.findOne({
      where: { id: context.id },
    });
    if (!oldWorkplaceId) throw new BadRequest('Workplace not found');

    // trying to update workplace name
    if (data.workPlace.name) {
      await UserWorkPlace.destroy({
        where: {
          UserId: context.params.User.id,
          WorkPlaceId: oldWorkplaceId,
        },
      });

      const [{ id: newWorkplaceId }] = await WorkPlace.findOrCreate({
        where: { name: data.workPlace.name },
      });

      await UserWorkPlace.findOrCreate({
        where: {
          UserId: context.params.User.id,
          WorkPlaceId: newWorkplaceId,
        },
        defaults: {
          ...data.workPlace,
        },
      });
    } else {
      await UserWorkPlace.update(data.workPlace, {
        where: {
          UserId: context.params.User.id,
          WorkPlaceId: context.id,
        },
      });
    }
    context.result = { message: 'Workplace updated' };
  } catch (err) {
    Logger.error(err);
    throw new BadRequest('Error Updating workplace');
  }

  return context;
};
