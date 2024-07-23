import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Op } from '@sequelize/core';

const userAttributes = ['firstName', 'lastName', 'id', 'profilePicture'];

export default (context: HookContext): HookContext => {
  const { app, params } = context;
  if (!params.provider) return context;
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);
  const Sequelize = app.get('sequelizeClient');
  context.service.options.Model = Sequelize.models.User;

  const { action, UserId } = where;
  if (!action) throw new BadRequest('Please set an action');
  delete where.action;
  delete where.UserId;
  const peopleWhoWantToBeMyFriend = `(

      EXISTS (
        SELECT 1
      FROM "User_friends_request" AS "UFR"
      WHERE "UFR"."friendsRequestId"='${
        UserId || params.User.id
      }' AND "UFR"."UserId"="User"."id"
    ))`;

  const peopleIWantToBe = `(

      EXISTS (
        SELECT 1
      FROM "User_friends_request" AS "UFR"
      WHERE "UFR"."UserId"='${
        UserId || params.User.id
      }' AND "UFR"."friendsRequestId"="User"."id"
    ))`;

  const clause = {
    ...where,
    [Op.and]: [],
  };

  switch (action) {
    case 'people-i-want-to-be-friend-with':
      clause[Op.and].push(
        Sequelize.where(Sequelize.literal(peopleWhoWantToBeMyFriend), true)
      );
      break;

    // case 'people-i-want-to-be-friend-with':
    case 'people-who-want-to-Be-my-friend':
      clause[Op.and].push(
        Sequelize.where(Sequelize.literal(peopleIWantToBe), true)
      );
      break;
    default:
      throw new Error('This action is not supported');
  }

  params.sequelize = {
    where: clause,
    attributes: userAttributes,
  };

  return context;
};
