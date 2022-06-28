// Initializes the `community-Users ` service on path `/community-users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CommunityUsers } from './community-users.class';
import hooks from './community-users.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'community-users': CommunityUsers & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.CommunityUsers,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/community-users', new CommunityUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('community-users');

  service.hooks(hooks);
}
