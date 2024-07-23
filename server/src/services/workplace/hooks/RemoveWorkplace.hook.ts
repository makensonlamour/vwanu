import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import Logger from '../../../lib/utils/logger';

export default async (context: HookContext): Promise<HookContext> => {
  const { id, app, params } = context;

  try {
    const sequelizeClient = app.get('sequelizeClient');
    const { UserWorkPlace } = sequelizeClient.models;

    await UserWorkPlace.destroy({
      where: {
        UserId: params.User.id,
        WorkPlaceId: id,
      },
    });
    context.result = { message: 'Workplace removed' };
  } catch (err) {
    Logger.error(err);
    throw new BadRequest('Error removing workplace');
  }

  return context;
};
