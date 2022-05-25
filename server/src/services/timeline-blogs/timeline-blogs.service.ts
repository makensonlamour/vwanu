/* eslint-disable no-unused-vars */
// Initializes the `timelineBlogs` service on path `/timeline-blogs`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { TimelineBlogs } from './timeline-blogs.class';

import hooks from './timeline-blogs.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'timeline-blogs': TimelineBlogs & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: app.get('sequelizeClient').models.Blog,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/timeline-blogs', new TimelineBlogs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('timeline-blogs');

  service.hooks(hooks);
}
