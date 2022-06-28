// Initializes the `community-role` service on path `/community-role`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CommunityRole } from './community-role.class';
import hooks from './community-role.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'community-role': CommunityRole & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.CommunityRoles,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/community-role', new CommunityRole(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('community-role');

  service.hooks(hooks);
}
