// Initializes the `userAddress` service on path `/user-address`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UserAddress } from './user-address.class';
import hooks from './user-address.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'user-address': UserAddress & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.EntityAddress,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/user-address', new UserAddress(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-address');

  service.hooks(hooks);
}
