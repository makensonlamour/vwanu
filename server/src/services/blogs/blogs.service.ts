// Initializes the `blogs ` service on path `/blogs`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Blogs } from './blogs.class';
import hooks from './blogs.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    blogs: Blogs & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Blog,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/blogs', new Blogs(options, app));
  // Get our initialized service so that we can register hooks
  const service = app.service('blogs');

  service.hooks(hooks);
}
