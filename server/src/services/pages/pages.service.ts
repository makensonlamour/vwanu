// Initializes the `pages` service on path `/pages`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Pages } from './pages.class';
import hooks from './pages.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    pages: Pages & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Page,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/pages', new Pages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pages');

  service.hooks(hooks);
}
