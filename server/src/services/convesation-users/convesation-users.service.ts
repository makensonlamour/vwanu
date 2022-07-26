// Initializes the `conversation-users ` service on path `/conversation-users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ConversationUsers } from './conversation-users.class';

import hooks from './conversation-users.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'conversation-users': ConversationUsers & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Conversation_Users,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/conversation-users', new ConversationUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('conversation-users');

  service.hooks(hooks);
}
