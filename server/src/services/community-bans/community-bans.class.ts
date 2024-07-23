import { QueryTypes } from '@sequelize/core';
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class CommunityBans extends Service {
  app: Application;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data: any, params: Params) {
    const { userId, communityId, comment, until } = data;
    const sequelize = this.app.get('sequelizeClient');

    try {
      await sequelize.query(
        `call insert_community_ban(:userId,:communityId,:by_user_id,:comment, :until )`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            userId,
            communityId,
            by_user_id: params.User.id,
            comment: comment || '',
            until: until || null,
          },
        }
      );
      return Promise.resolve({ message: 'Ban created' });
    } catch (err) {
      const fallback = 'Could not create ban';
      throw new BadRequest(err.message || fallback);
    }
  }
}
