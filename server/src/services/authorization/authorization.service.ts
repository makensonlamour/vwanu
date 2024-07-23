import { ServiceAddons } from '@feathersjs/feathers';

import hooks from './authorization.hooks';
import { Application } from '../../declarations';
import { Authorization } from './authorization.class';

/**
 * Extends the ServiceTypes interface in the declarations module to include the 'authorization' service.
 */
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    authorization: Authorization & ServiceAddons<any>;
  }
}

/**
 * Initializes and configures the 'authorization' service.
 * @param app The Feathers application instance.
 * @service_description This service is used to manage the access levels of users. It is allow a user with higher access level to grant access to another user with lower access level. 
 * @service_1_granted_to The user that is being granted access.
 * @service_2_granted_by The user that is granting access.
 * @service_3_access_level The access level being granted.
 * @service_4_access_level_logs The table that logs the access level changes.
 * 
 * @HowToUse An example of how to use this service is as follows: For a user a with admin access to give user b with user access access, user a will create a new record in the access_level_logs table with the granted_to field as user b's id, the granted_by field will automatically be user a's id and the access_level field as user access. this is done by sending a post request to the authorization service with the required fields.
 */
export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.AccessLevelLogs,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/authorization', new Authorization(options, app));
  const service = app.service('authorization');
  service.hooks(hooks);
}
