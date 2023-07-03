/* eslint-disable no-unused-vars */
// Initializes the `workplace ` service on path `/workplace`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Workplace } from './workplace.class';
import hooks from './workplace.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    workplace: Workplace & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelizeClient = app.get('sequelizeClient');
  const options = {
    Model: sequelizeClient.models.WorkPlace,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/workplace', new Workplace(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('workplace');

  service.hooks(hooks);
}
