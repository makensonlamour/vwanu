// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { TemplateMessages } from './templateMessages.class';

import hooks from './templateMessage.hook';
// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    template_messages: TemplateMessages & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.TemplateMessages,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/template_messages', new TemplateMessages(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service: any = app.service('template_messages');
  service.hooks(hooks);
}
