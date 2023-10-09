import fs from 'fs';
import path from 'path';
import { Id } from '@feathersjs/feathers';
import { Sequelize } from 'sequelize';

const isMemberQuery = fs.readFileSync(
  path.join(__dirname, '../sql', 'ismember.sql'),
  'utf8'
);

export default (userId: Id, communityId: Id, sequelize: Sequelize) => {
  const query = isMemberQuery
    .replace(/:userId/g, userId as string)
    .replace(/:communityId/g, communityId as string);

  return sequelize.literal(query);
  // return sequelize.literal('true');
};
