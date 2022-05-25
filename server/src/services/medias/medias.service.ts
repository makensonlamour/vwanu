// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Medias } from './medias.class';
import hooks from './medias.hook';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    media: Medias & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Media,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/medias', new Medias(options, app));

  // Get our initialized service so that we can register hooks
  const service: any = app.service('medias');
  service.hooks(hooks);
}
