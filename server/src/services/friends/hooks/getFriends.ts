import { HookContext } from '@feathersjs/feathers';
import { Op } from '@sequelize/core';

export default (context: HookContext): HookContext => {
  const { app, params } = context;
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);
  const Sequelize = app.get('sequelizeClient');

  const friends = `(
    EXISTS(
    SELECT 1
    FROM "User_friends" AS "UF"
    WHERE "UF"."UserId"='${params.User.id}' AND "UF"."friendId"="User"."id"
  ))`;

  const clause = {
    ...where,
    [Op.and]: [Sequelize.where(Sequelize.literal(friends), true)],
  };
  params.sequelize = {
    where: clause,

    attributes: [
      'firstName',
      'lastName',
      'email',
      'id',
      'profilePicture',
      'createdAt',
      'updatedAt',
    ],

    // attributes: {
    //   include: [[Sequelize.literal(friends), 'User']],
    // },
  };

  return context;
};
