import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Phone } from './phone.class';
import hooks from './phone.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    phone: Phone & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Phone,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/phone', new Phone(options, app));

  const service = app.service('phone');
  service.hooks(hooks);
}
