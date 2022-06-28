/* eslint-disable no-unused-vars */
// Initializes the `communities ` service on path `/communities`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Communities } from './communities.class';
import { CommunitiesRegistration } from '../communityRegistration/comunity-registration.class';
import { CommunityAdmin } from './community-admin.class';

import hooks from './communities.hooks';
import registrationHooks from '../communityRegistration/registration.hooks';
import adminHooks from './community-admin.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    communities: Communities & ServiceAddons<any>;
    ['communities-registrations']: CommunitiesRegistration & ServiceAddons<any>;
    ['community-admin']: CommunityAdmin & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Community,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/communities', new Communities(options, app));
  app.use(
    '/communities-registrations',
    new CommunitiesRegistration(options, app)
  );
  app.use('/community-admin', new CommunityAdmin(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('communities');
  service.hooks(hooks);
  const registrationService = app
    .service('communities-registrations')
    .hooks(registrationHooks);

  app.service('community-admin').hooks(adminHooks);
}
