import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

// eslint-disable-next-line no-unused-vars
export default (options:any) => async (context: HookContext) => {
  const { params, id, app } = context;
  const { models } = app.get('sequelizeClient');

  const entity = await app.service(context.path).get(id);
  if (entity.UserId && entity.UserId !== params.User.id) {
    const parent = await models.Community.findByPk(entity.CommunityId);

    const requester = await models.Community.findByPk(params.User.id);

    if (!(await parent.hasAdministrator(requester)))
      throw new BadRequest('Only owner and admin can modify this data');

    if (Object.keys(context.data).length > 2)
      throw new BadRequest('Admin can ony ban and add banned reason');
    if (
      !Object.keys(context.data).some((m) => m === 'banned' || 'bannedReason')
    )
      throw new BadRequest('Admin can ony ban and add banned reason');

    return context;
  }
  return context;
};
