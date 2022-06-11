// Initializes the `Services` service on path `/services`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Services } from './services.class';

import hooks from './services.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    services: Services & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Service,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/services', new Services(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('services');

  service.hooks(hooks);
}
