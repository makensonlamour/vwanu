import config from 'config';
import Mailer from 'feathers-mailer';
import { ServiceAddons } from '@feathersjs/feathers';

/** Local dependencies */
import { Application } from '../../declarations';

declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    mailer: Mailer & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const transporter = {
    host: config.get<string>('smtp_host'),
    port: 587,
    auth: {
      user: config.get<string>('smtp_username'),
      pass: config.get<string>('smtp_password'),
    },
  };

  app.use(
    '/mailer',
    Mailer(transporter, { from: config.get<string>('sendEmailFrom') })
  );
  // const service = app.service('mailer');
  // service.hooks(hooks);
}
