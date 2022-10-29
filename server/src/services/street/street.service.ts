// Initializes the `street` service on path `/street`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Street } from './street.class';

import hooks from './street.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    street: Street & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Street,
    paginate: undefined,
  };

  // Initialize our service with any options it requires
  app.use('/street', new Street(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('street');

  service.hooks(hooks);
}
