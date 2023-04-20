// Initializes the `templates` service on path `/templates`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Templates } from './templates.class';
import createModel from '../../models/templates.model';
import hooks from './templates.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'templates': Templates & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/templates', new Templates(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('templates');

  service.hooks(hooks);
}
