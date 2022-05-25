// Initializes the `timeline ` service on path `/timeline`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Timeline } from './timeline.class';

import hooks from './timeline.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    timeline: Timeline & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Post,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/timeline', new Timeline(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('timeline');

  service.hooks(hooks);
}
