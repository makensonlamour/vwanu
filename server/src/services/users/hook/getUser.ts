import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import userQuery, { queryClause } from '../../../lib/utils/userQuery';

export default (context: HookContext) => {
  const { app, params } = context;
  if (!params.provider) return context;
  if (!params?.User?.id)
    throw new BadRequest('You must be logged in to access this route');

  const Sequelize = app.get('sequelizeClient');
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);
  if (context.method === 'get') where.id = context.id;
  const attributes = userQuery(params.User.id, Sequelize);
  const clause = queryClause(context, where);
  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes,
  };
  return context;
};
