// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Medias } from './medias.class';
import createModel from '../../models/media.model';
import hooks from './medias.hook';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    posts: Medias & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/medias', new Medias(options, app));

  // Get our initialized service so that we can register hooks
  const service: any = app.service('medias');
  service.hooks(hooks);
}
