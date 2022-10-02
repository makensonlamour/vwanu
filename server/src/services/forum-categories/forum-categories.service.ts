// Initializes the `forumCategories ` service on path `/forum-categories`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ForumCategories } from './forum-categories.class';

import hooks from './forum-categories.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'forum-categories': ForumCategories & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.ForumCategory,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/forum-categories', new ForumCategories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('forum-categories');

  service.hooks(hooks);
}
