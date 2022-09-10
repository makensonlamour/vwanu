// Initializes the `search-community` service on path `/search-community`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { SearchCommunity } from './search-community.class';

import hooks from './search-community.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'search-community': SearchCommunity & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const CommunityModel = sequelize.models.Community;
  const options = {
    Model: CommunityModel,
    paginate: app.get('paginate'),
    whitelist: ['$search'],
  };

  // Initialize our service with any options it requires
  app.use('/search-community', new SearchCommunity(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('search-community');

  service.hooks(hooks);
}
