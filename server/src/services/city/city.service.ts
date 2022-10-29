// Initializes the `city ` service on path `/city`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { City } from './city.class';
import hooks from './city.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    city: City & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.City,
    paginate: undefined,
  };

  // Initialize our service with any options it requires
  app.use('/city', new City(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('city');

  service.hooks(hooks);
}
