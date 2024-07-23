// Initializes the `community_bans ` service on path `/community-bans`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CommunityHistory } from './community-history.class';
import hooks from './community-history.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'community-history': CommunityHistory & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.CommunityHistory,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/community-history', new CommunityHistory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('community-history');

  service.hooks(hooks);
}
