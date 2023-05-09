import config from 'config';
import Mailer from 'feathers-mailer';
import { ServiceAddons } from '@feathersjs/feathers';

/** Local dependencies */
import Logger from '../../lib/utils/logger';
import { Application } from '../../declarations';
import SMTP_CONF, {
  SMTP_CONFIGURATION,
} from '../../schema/smtpconfiguration.schema';

declare module '../../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    mailer: Mailer & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  try {
    if (config.has('SMTP_CONFIGURATION')) {
      const configuration =
        config.get<SMTP_CONFIGURATION>('SMTP_CONFIGURATION');

      if (SMTP_CONF.parse(configuration)) {
        const transporter = {
          ...configuration,
        };

        app.use(
          '/mailer',
          Mailer(transporter, { from: configuration.email_from })
        );
      }
    } else {
      throw new Error('SMTP_CONFIGURATION is not defined');
    }
  } catch (error) {
    Logger.error(error.message || 'SMTP_CONFIGURATION is not defined');
    process.exit(1);
  }
}
