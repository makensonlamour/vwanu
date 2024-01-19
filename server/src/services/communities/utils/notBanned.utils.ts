import { Id } from '@feathersjs/feathers';
import { Sequelize } from 'sequelize';
import notBannedQuery from '../sql/notbanned.sql';

export default (userId: Id, communityId: Id, sequelize: Sequelize) => {
  const query = notBannedQuery
    .replace(/:userId/g, userId as string)
    .replace(/:communityId/g, communityId as string);

  return sequelize.literal(query);
  // return sequelize.literal('true');
};
