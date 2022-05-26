import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class Notification extends Service {
  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }
}
