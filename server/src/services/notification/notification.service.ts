import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Notification } from './notification.class';
import hooks from './notification.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    notification: Notification & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Notification,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/notification', new Notification(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notification');

  service.hooks(hooks);
}
