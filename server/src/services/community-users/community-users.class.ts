import { BadRequest } from '@feathersjs/errors';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class CommunityUsers extends Service {
  app;
  
  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async patch(id, data, params) {
    if (params.query.demote) {
      try {
        const response = await this.app
          .get('sequelizeClient')
          .query(
            `Call proc_demote_community_member(:requesterId,:userId,:communityId, :demoting_role_id)`,
            {
              replacements: {
                requesterId: params.User.id,
                userId: id,
                communityId: params.query.communityId,
                demoting_role_id: params.query.demote,
              },
            }
          );

        console.log(response);
        return Promise.resolve(response);
      } catch (e) {
        console.error(e);
        throw new BadRequest(e.message);
      }
    } else throw new BadRequest('demote query param is required');
  }
}
