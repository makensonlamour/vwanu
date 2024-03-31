import { Id } from '@feathersjs/feathers';
import { Sequelize } from 'sequelize';

import canUserDo from './canUserdo';

import isMemberQuery from '../sql/ismember.sql';

import pendingInvitationQuery from '../sql/pendinginvitation.sql';

import interestsQuery from '../sql/interests.sql';



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
