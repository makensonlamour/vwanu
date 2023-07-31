// Initializes the `userWorkPlaces` service on path `/user-work-places`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UserWorkPlaces } from './user-work-places.class';
import hooks from './user-work-places.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'user-work-places': UserWorkPlaces & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.UserWorkPlace,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/user-work-places', new UserWorkPlaces(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-work-places');

  service.hooks(hooks);
}
