// import { QueryTypes } from 'sequelize';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class Communities extends Service {
  app;

  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
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
