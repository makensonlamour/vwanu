// Initializes the `blogs ` service on path `/blogs`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Blogs } from './blogs.class';
import hooks from './blogs.hooks';
import fileToFeathers from '../../middleware/PassFilesToFeathers/file-to-feathers.middleware';
import { blogStorage } from '../../cloudinary';
import updateTheTSVector from '../search/tsquery-and-search.hook';
// Add this service to the service type index
declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    blogs: Blogs & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
   const sequelize = app.get('sequelizeClient');
   const BlogModel = sequelize.models.Blog;
  const options = {
    Model: BlogModel,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use(
    '/blogs',
    blogStorage.fields([{ name: 'coverPicture', maxCount: 1 }]),
    fileToFeathers,
    new Blogs(options, app)
  );
  // Get our initialized service so that we can register hooks
  const service = app.service('blogs');
  service.hooks({
    before: { ...hooks.before },
    after: {
      ...hooks.after,
      create: [
        ...hooks.after.create,
        updateTheTSVector({
          model: BlogModel,
          searchColumn: 'search_vector',
        }),
      ],
      update: [
        updateTheTSVector({
          model: BlogModel,
          searchColumn: 'search_vector',
        }),
      ],
      patch: [
        updateTheTSVector({
          model: BlogModel,
          searchColumn: 'search_vector',
        }),
      ],
    },
  });
}
