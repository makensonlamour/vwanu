import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { EmailTemplates } from './email-template.class';
import hooks from './email-template.hook';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    ['email-template']: EmailTemplates & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.EmailTemplate,
    paginate: {
      default: 10,
      max: 50,
    },
  };

  // Initialize our service with any options it requires
  app.use('/email-template', new EmailTemplates(options, app));
  const service = app.service('email-template');
  service.hooks(hooks);
}
