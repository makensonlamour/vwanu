// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Friends } from './friends.class';
import hooks from './friends.hook';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    friends: Friends & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.User,
    paginate: app.get('paginate'),
    multi: ['remove'],
  };

  // Initialize our service with any options it requires
  app.use('/friends', new Friends(options, app));

  // Get our initialized service so that we can register hooks
  const service: any = app.service('friends');
  service.hooks(hooks);
}
