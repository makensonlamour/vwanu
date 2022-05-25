// Initializes the `refresh-tokens` service on path `/refresh-tokens`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RefreshTokens } from './refresh-tokens.class';
import hooks from './refresh-tokens.hooks';


declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    'refresh-tokens': RefreshTokens & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');
  const options = {
    Model: sequelize.models.RefreshToken,
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/refresh-tokens', new RefreshTokens(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('refresh-tokens');

  service.hooks(hooks);
}
