// Initializes the `search-blog ` service on path `/search-blog`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { SearchBlog } from './search-blog.class';
import hooks from './search-blog.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'search-blog': SearchBlog & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
    const sequelize = app.get('sequelizeClient');
    const BlogModel = sequelize.models.Blog;
  const options = {
    Model: BlogModel,
    paginate: app.get('paginate'),
    whitelist: ['$search'],
  };

  // Initialize our service with any options it requires
  app.use('/search-blog', new SearchBlog(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('search-blog');

  service.hooks(hooks);
}
