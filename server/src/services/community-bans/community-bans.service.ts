// Initializes the `community_bans ` service on path `/community-bans`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CommunityBans } from './community-bans.class';
import hooks from './community-bans.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'community-bans': CommunityBans & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.CommunityBans,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/community-bans', new CommunityBans(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('community-bans');

  service.hooks(hooks);
}
