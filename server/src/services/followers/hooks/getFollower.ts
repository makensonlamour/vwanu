import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Op } from '@sequelize/core';

import userQuery from '../../../lib/utils/userQuery';

export default (context: HookContext): HookContext => {
  const { app, params } = context;
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);
  const Sequelize = app.get('sequelizeClient');
  context.service.options.Model = Sequelize.models.User;

  const { action, UserId } = where;
  delete where.action;
  delete where.UserId;
  const follower = `(
    EXISTS(
    SELECT 1
    FROM "User_Follower" AS "UF"
    WHERE "UF"."UserId"='${
      UserId || params.User.id
    }' AND "UF"."FollowerId"="User"."id"
  ))`;

  const following = `(
    EXISTS( 
    SELECT 1 
    FROM "User_Following" AS "UF"
    WHERE "UF"."UserId"="User"."id" AND "UF"."FollowingId"='${
      UserId || params.User.id
    }'))`;

  const clause = {
    ...where,
    [Op.and]: [],
  };
  switch (action) {
    case 'people-who-follow-me':
      clause[Op.and].push(Sequelize.where(Sequelize.literal(follower), true));
      break;
    case 'people-i-follow':
      clause[Op.and].push(Sequelize.where(Sequelize.literal(following), true));
      break;
    default:
      throw new BadRequest('This action is not supported');
  }

  const attributes = userQuery(params.User.id, Sequelize);
  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes,
    // attributes: [
    //   'firstName',
    //   'lastName',
    //   'email',
    //   'id',
    //   'profilePicture',
    //   'createdAt',
    //   'updatedAt',
    // ],

    // attributes: {
    //   include: [[Sequelize.literal(friends), 'User']],
    // },
  };

  return context;
};
