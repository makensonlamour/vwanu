// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Comments } from './comments.class';
import hooks from './comments.hook';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    comments: Comments & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Post,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/comments', new Comments(options, app));

  const service = app.service('comments');
  service.hooks(hooks);
}
