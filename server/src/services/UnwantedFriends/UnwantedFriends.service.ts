// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { FriendRequest } from './UnwantedFriends.class';
import hooks from './UnwantedFriends.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    unwantedFriends: FriendRequest & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.User_friends_undesired,
    paginate: app.get('paginate'),
  };

  app.use('/unwantedFriends', new FriendRequest(options, app));
  const service = app.service('friendRequest');
  service.hooks(hooks);
}
