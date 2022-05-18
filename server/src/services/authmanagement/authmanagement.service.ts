import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { AuthManagement } from './authmanagement.class';
import hooks from './authmanagement.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    authmanagement: AuthManagement & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.User,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/authmanagement', new AuthManagement(options, app));

  const service = app.service('authmanagement');
  service.hooks(hooks);
}
