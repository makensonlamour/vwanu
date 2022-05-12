// Initializes the `search` service on path `/search`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Search } from './search.class';

import hooks from './search.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    search: Search & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const UserModel = sequelize.models.User;
  const options = {
    Model: UserModel,
    paginate: app.get('paginate'),
    whitelist: ['$search'],
  };

  // Initialize our service with any options it requires
  app.use('/search', new Search(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('search');

  service.hooks(hooks);
}
