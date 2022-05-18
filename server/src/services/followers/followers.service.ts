// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Followers } from './followers.class';
import hooks from './followers.hook';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    follower: Followers & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.User_Follower,
    paginate: app.get('paginate'),
  };

  app.use('/followers', new Followers(options, app));
  const service: any = app.service('followers');
  service.hooks(hooks);
}
