/* eslint-disable camelcase */
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class UserNotificationTypes extends Service {
  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
  }

  async patch(id, data) {
    // eslint-disable-next-line camelcase
    const { UserId: user_id, notification_slug, ...rest } = data;
    this.Model.update(rest, { where: { user_id, notification_slug } });

    // return super.patch(id, data, params);
    return {};
  }
}
