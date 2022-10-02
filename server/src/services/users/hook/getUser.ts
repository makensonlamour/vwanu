import { Op } from '@sequelize/core';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import userQuery, { AreFriends } from '../../../lib/utils/userQuery';

export default (context: HookContext) => {
  const { app, params } = context;
  if (!params.provider) return context;
  if (!params?.User?.id)
    throw new BadRequest('You must be logged in to access this route');

  const Sequelize = app.get('sequelizeClient');
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  const OnlyInterests = (interest) =>
    `(
  EXISTS(
    SELECT 1 FROM "Interests" AS "I" 
    INNER JOIN "User_Interest" AS "CI" ON "CI"."InterestId"="I"."id" AND "CI"."UserId"="User"."id"
    WHERE "I"."name"= '${interest}' )
  
  )`;

  if (context.method === 'get') where.id = context.id;
  const attributes = userQuery(params.User.id, Sequelize);

  delete where?.profilePrivacy;
  let clause = {
    ...where,
    [Op.and]: {
      [Op.or]: [
        { profilePrivacy: 'public' },
        { id: params?.User?.id },
        {
          [Op.and]: [
            { profilePrivacy: 'friends' },
            AreFriends(params.User.id, Sequelize),
          ],
        },
      ],
    },
  };
  if (where.friends) {
    delete where.friends;
    clause = {
      ...where,
      [Op.and]: [AreFriends(params.User.id, Sequelize)],
    };
  }

  if (where.interests) {
    const { interests } = where;
    delete where.interests;
    clause[Op.and].push(
      Sequelize.where(Sequelize.literal(OnlyInterests(interests)), true)
    );
  }

  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes,
  };
  return context;
};
