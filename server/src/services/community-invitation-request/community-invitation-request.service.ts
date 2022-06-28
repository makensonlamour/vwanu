// Initializes the `communityInvitationRequest` service on path `/community-invitation-request`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CommunityInvitationRequest } from './community-invitation-request.class';

import hooks from './community-invitation-request.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'community-invitation-request': CommunityInvitationRequest &
      ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.CommunityInvitationRequest,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    '/community-invitation-request',
    new CommunityInvitationRequest(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('community-invitation-request');

  service.hooks(hooks);
}
