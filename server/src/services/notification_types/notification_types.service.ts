import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { NotificationTypes } from './notification_types.class';
import hooks from './notification_types.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    notification_types: NotificationTypes & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.NotificationTypes,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/notification_types', new NotificationTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notification_types');
  // service.publish('created', (notification) =>
  //   app.channel(`userIds-${notification.to}`)
  // );

  service.hooks(hooks);
}
