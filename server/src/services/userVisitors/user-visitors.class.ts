/* eslint-disable no-unused-vars */
// import { Op } from '@sequelize/core';
// import { Params } from '@feathersjs/feathers';

import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

/** Local dependencies */
import { Application } from '../../declarations';
// eslint-disable-next-line import/prefer-default-export
export class UserVisitor extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  // async remove(data, params: Params) {
  //   await this.app
  //     .get('sequelizeClient')
  //     .models.User_friends_request.destroy({ where: { ...params.query } });
  //   return Promise.resolve({ ...params.query });
  // }
}
