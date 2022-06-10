// Initializes the `blogResponse ` service on path `/blog-response`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BlogResponse } from './blog-response.class';
import hooks from './blog-response.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    blogResponse: BlogResponse & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.BlogResponse,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/blogResponse', new BlogResponse(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('blogResponse');
  service.hooks(hooks);
}
