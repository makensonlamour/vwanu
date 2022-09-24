import { Op } from '@sequelize/core';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext) => {
  const { app, params } = context;
  if (!params.provider) return context;
  if (!params?.User?.id)
    throw new BadRequest('You must be logged in to access this route');

  const Sequelize = app.get('sequelizeClient');

  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  console.log({ id: params?.User?.id, met: context.method });
  const friends = `(
       EXISTS(
        SELECT 1 FROM "User_friends" WHERE "User_friends"."UserId" = "User"."id" AND "User_friends"."friendId" = '${params.User.id}'
       )
      )`;

  delete where?.profilePrivacy;
  const clause = {
    ...where,
    [Op.and]: {
      [Op.or]: [
        { profilePrivacy: 'public' },
        { id: params?.User?.id },
        {
          [Op.and]: [{ profilePrivacy: 'friends' }, Sequelize.literal(friends)],
        },
      ],
    },
  };

    params.sequelize = {
      where: clause,
    };
  return context;
};
