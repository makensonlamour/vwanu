// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UserVisitor } from './user-visitors.class';
import hooks from './user-visitors.hook';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    userVisitor: UserVisitor & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Visitor,
    paginate: app.get('paginate'),
  };

  app.use('/userVisitor', new UserVisitor(options, app));
  const service = app.service('userVisitor');
  service.hooks(hooks);
}
