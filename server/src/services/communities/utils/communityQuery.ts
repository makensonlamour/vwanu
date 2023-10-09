import fs from 'fs';
import path from 'path';
import { Id } from '@feathersjs/feathers';
import { Sequelize } from 'sequelize';

import canUserDo from './canUserdo';

// const borrowerQuery = fs.readFileSync(
//   path.join(__dirname, '../sql', 'borrowerQuery.sql'),
//   'utf8'
// );
// const planQuery = fs.readFileSync(
//   path.join(__dirname, '../sql', 'planQuery.sql'),
//   'utf8'
// );

const isMemberQuery = fs.readFileSync(
  path.join(__dirname, '../sql', 'member.sql'),
  'utf8'
);

const pendingInvitationQuery = fs.readFileSync(
  path.join(__dirname, '../sql', 'pendinginvitation.sql'),
  'utf8'
);

const interestsQuery = fs.readFileSync(
  path.join(__dirname, '../sql', 'interests.sql'),
  'utf8'
);

export default (userId: Id, sequelize: Sequelize, exclude: string[] = []) => {
  const excludeQuery = [...exclude, 'search_vector'];
  return {
    include: [
      [
        sequelize.literal(isMemberQuery.replace(/:userId/g, userId as string)),
        'isMember',
      ],
      [
        sequelize.literal(
          pendingInvitationQuery.replace(/:userId/g, userId as string)
        ),
        'pendingInvitation',
      ],
      [sequelize.literal(interestsQuery), 'Interests'],
      [sequelize.literal(canUserDo(userId, 'canInPost')), 'canUserPost'],
      [sequelize.literal(canUserDo(userId, 'canInvite')), 'canUserInvite'],
      [
        sequelize.literal(canUserDo(userId, 'canInUploadDoc')),
        'canUserUploadDoc',
      ],
      [
        sequelize.literal(canUserDo(userId, 'canInUploadPhotos')),
        'canUserUploadPhotos',
      ],
      [
        sequelize.literal(canUserDo(userId, 'canInUploadVideo')),
        'canUserUploadVideo',
      ],
      [
        sequelize.literal(canUserDo(userId, 'canMessageInGroup')),
        'canMessageUserInGroup',
      ],
    ],
    exclude: excludeQuery,
  };
};
