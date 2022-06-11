// Initializes the `korem` service on path `/korem`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Korem } from './korem.class';

import hooks from './korem.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'korem': Korem & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Korem,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/korem', new Korem(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('korem');

  service.hooks(hooks);
}
