import { BadRequest } from '@feathersjs/errors';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class CommunityJoin extends Service {
  app: Application;
  // eslint-disable-next-line no-unused-vars

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data: any, params: any) {
    const seq = this.app.get('sequelizeClient');

    try {
      const response = await seq.query(
        `call join_community(:userId,:communityId)`,
        {
          replacements: {
            communityId: data.CommunityId,
            userId: params.User.id,
          },
        }
      );
      return Promise.resolve(response);
    } catch (err) {
      throw new BadRequest(err.message);
    }
  }
}
