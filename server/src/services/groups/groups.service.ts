// Initializes the `groups ` service on path `/groups`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Groups } from './groups.class';

import hooks from './groups.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    groups: Groups & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Blog,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/groups', new Groups(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('groups');

  service.hooks(hooks);
}
