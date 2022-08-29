// Initializes the `state ` service on path `/state`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { State } from './state.class';
import hooks from './state.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    state: State & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.State,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/state', new State(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('state');

  service.hooks(hooks);
}
