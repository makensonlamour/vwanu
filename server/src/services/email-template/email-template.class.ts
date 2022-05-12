/* eslint-disable no-unused-vars */
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { Application } from '../../declarations';
// eslint-disable-next-line import/prefer-default-export
export class EmailTemplates extends Service {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
