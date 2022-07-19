// Initializes the `BlogKorem` service on path `/blogKorem`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { BlogKorem } from './blog-korem.class';
import hooks from './blog-korem.hooks';

declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    blogKorem: BlogKorem & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Korem,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/blogKorem', new BlogKorem(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('blogKorem');
  service.hooks(hooks);
}
