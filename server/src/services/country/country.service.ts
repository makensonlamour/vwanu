// Initializes the `country` service on path `/country`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Country } from './country.class';
import hooks from './country.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    country: Country & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Country,
    paginate: undefined,
  };

  // Initialize our service with any options it requires
  app.use('/country', new Country(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('country');

  service.hooks(hooks);
}
