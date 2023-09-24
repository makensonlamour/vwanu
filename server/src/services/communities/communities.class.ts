// import { QueryTypes } from 'sequelize';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { Id, Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

import { Application } from '../../declarations';
// eslint-disable-next-line import/prefer-default-export
export class Communities extends Service {
  app;

  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async get(id: Id, params: Params) {
    const { log } = console;

    const sequelize = this.app.get('sequelizeClient');

    try {
      let [community] = await sequelize.query(
        'SELECT * FROM fn_get_community_by_id(?,?)',
        {
          replacements: [params.User.id, id],
          type: sequelize.QueryTypes.SELECT,
        }
      );

      community = {
        ...community,
        name: community?.community_name,
        id: community?.comm_id,
        privacyType: community?.commPrivacyType,
        UserId: community?.commUserId,
      };

      delete community.comm_id;
      delete community.community_name;
      delete community.commPrivacyType;
      delete community.commUserId;

      return Promise.resolve(community);
    } catch (e) {
      if (e.message.includes('permission')) throw new BadRequest(e.message);
      log({ message: e.message, stack: e.stack });
      log(`error finding the  community with id ${id as string}`, e);
      return Promise.reject(e);
    }
  }

  // async find(params) {
  //   const requesterId = params.User.id;
  //   const sequelize = this.app.get('sequelizeClient');

  //   try {
  //     const [communities, met] = await sequelize.query(
  //       `SELECT * FROM
  //       ( SELECT * FROM "CommunityUsers" INNER JOIN "Users" ON "CommunityUsers"."UserId"= "Users".id ) a
  //       INNER JOIN
  //       (SELECT * FROM "Communities" WHERE "privacyType"<>'hidden' AND "id"<>a.id) b`
  //     );

  //     console.log(communities, met);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   return Promise.resolve([]);
  // }
}
