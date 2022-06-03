// Initializes the `discussion ` service on path `/discussion`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Discussion } from './discussion.class';
import hooks from './discussion.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    discussion: Discussion & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Discussion,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/discussion', new Discussion(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('discussion');

  service.hooks(hooks);
}
