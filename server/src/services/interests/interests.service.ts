// Initializes the `interests` service on path `/interests`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Interests } from './interests.class';
import hooks from './interests.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    interests: Interests & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const { models } = app.get('sequelizeClient');
  const options = {
    Model: models.Interest,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/interests', new Interests(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('interests');

  service.hooks(hooks);
}
