// Initializes the `users` service on path `/users`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Medias } from './medias.class';
import hooks from './medias.hook';
import fileToFeathers from '../../middleware/PassFilesToFeathers/file-to-feathers.middleware';
import { mediaStorage } from '../../cloudinary';
// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    medias: Medias & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Media,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    '/medias',
    mediaStorage.fields([
      { name: 'original', maxCount: 1 },
    ]),
    fileToFeathers,
    new Medias(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service: any = app.service('medias');
  service.hooks(hooks);
}
