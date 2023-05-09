/* eslint-disable no-unused-vars */
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class Templates extends Service {
  app: Application;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
