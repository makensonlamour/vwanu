import config from 'config';
import { ServiceAddons } from '@feathersjs/feathers';

/** Local dependencies */
import hooks from './posts.hook';
import { Posts } from './posts.class';
import { postStorage } from '../../cloudinary';
import { Application } from '../../declarations';
import transferUploadedFilesToFeathers from '../../middleware/PassFilesToFeathers/file-to-feathers.middleware';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    posts: Posts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.Post,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    '/posts',
    postStorage.fields([
      { name: 'postImage', maxCount: config.get<number>('maxPostImages') },
      { name: 'postVideo', maxCount: config.get<number>('maxPostVideos') },
      { name: 'postAudio', maxCount: config.get<number>('maxPostAudios') },
    ]),
    transferUploadedFilesToFeathers,
    new Posts(options, app)
  );

  const service = app.service('posts');
  service.hooks(hooks);
}
