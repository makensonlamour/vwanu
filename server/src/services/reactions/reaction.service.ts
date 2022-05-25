// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Reactions } from './reaction.class';

import hooks from './reaction.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    users: Reactions & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Reaction,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/reactions', new Reactions(options, app));

  // Get our initialized service so that we can register hooks
  const service: any = app.service('reactions');
  service.hooks(hooks);
}
