/* eslint-disable no-unused-vars */
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

/** Local dependencies */
import { Application } from '../../declarations';
// eslint-disable-next-line import/prefer-default-export
export class UndesiredFriend extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

 
}
