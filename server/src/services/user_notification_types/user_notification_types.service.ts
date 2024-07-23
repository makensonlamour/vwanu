import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UserNotificationTypes } from './user_notification_types.class';
import hooks from './user_notification_types.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    user_notification_types: UserNotificationTypes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.UserNotificationTypes,
    paginate: app.get('paginate'),
    multi: ['patch']
  };

  // Initialize our service with any options it requires
  app.use('/user_notification_types', new UserNotificationTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user_notification_types');
  // service.publish('created', (notification) =>
  //   app.channel(`userIds-${notification.to}`)
  // );

  service.hooks(hooks);
}
