// Initializes the `address` service on path `/address`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Address } from './address.class';
import hooks from './address.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    address: Address & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Address,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/address', new Address(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('address');

  service.hooks(hooks);
}
