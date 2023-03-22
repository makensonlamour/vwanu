// Initializes the `discussion ` service on path `/discussion`

import { ServiceAddons } from '@feathersjs/feathers';
/** Local dependencies  */
import hooks from './discussion.hooks';
import { Discussion } from './discussion.class';
import { Application } from '../../declarations';
import { discussionStorage } from '../../cloudinary';
import {
  MEDIA_CONFIG_SCHEMA,
  MEDIA_CONFIG_TYPE,
} from '../../schema/mediaConf.schema';
import transferUploadedFilesToFeathers from '../../middleware/PassFilesToFeathers/file-to-feathers.middleware';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    discussion: Discussion & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Discussion,
    paginate: app.get('paginate'),
  };

  const config: MEDIA_CONFIG_TYPE = app.get('MEDIA_CONFIGURATION');
  if (MEDIA_CONFIG_SCHEMA.parse(config)) {
    // Initialize our service with any options it requires
    app.use(
      '/discussion',
      discussionStorage.fields([
        {
          name: 'discussionImage',
          maxCount: config.maxDiscussionImages,
        },
        {
          name: 'discussionVideo',
          maxCount: config.maxDiscussionVideos,
        },
        {
          name: 'discussionAudio',
          maxCount: config.maxDiscussionAudios,
        },
      ]),
      transferUploadedFilesToFeathers,
      new Discussion(options, app)
    );

    // Get our initialized service so that we can register hooks
    const service = app.service('discussion');

    service.hooks(hooks);
  }
}
