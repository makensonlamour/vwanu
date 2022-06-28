// Initializes the `community-join ` service on path `/community-join`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CommunityJoin } from './community-join.class';
import hooks from './community-join.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'community-join': CommunityJoin & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.CommunityInvitationRequest,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/community-join', new CommunityJoin(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('community-join');

  service.hooks(hooks);
}
