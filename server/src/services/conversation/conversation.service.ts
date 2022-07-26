// Initializes the `conversation` service on path `/conversation`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Conversation } from './conversation.class';
import hooks from './conversation.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'conversation': Conversation & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Conversation,
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/conversation', new Conversation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('conversation');

  service.hooks(hooks);
}
