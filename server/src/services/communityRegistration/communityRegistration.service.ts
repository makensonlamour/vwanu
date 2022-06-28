/* eslint-disable no-unused-vars */
// Initializes the `communities ` service on path `/communities`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';

import { CommunitiesRegistration } from './comunity-registration.class';

import hook from './registration.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    ['communities-registrations']: CommunitiesRegistration & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.CommunityInvitationRequest,
    paginate: app.get('paginate'),
  };

  app.use(
    '/communities-registrations',
    new CommunitiesRegistration(options, app)
  );

  // Get our initialized service so that we can register hooks

  app.service('communities-registrations').hooks(hook);
}
