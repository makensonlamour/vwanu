// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UndesiredFriend } from './undesiredFriends.class';
import hooks from './undesiredFriends.hook';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    ['undesired-friend']: UndesiredFriend & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.User_friends_undesired,
    paginate: app.get('paginate'),
  };

  app.use('/undesired-friend', new UndesiredFriend(options, app));
  const service = app.service('undesired-friend');
  service.hooks(hooks);
}
