/* eslint-disable no-underscore-dangle */
import Logger from '../../lib/utils/logger';
import { Application } from '../../declarations';
import Notifier from '../../lib/utils/notifier/not';
import { EmailerService } from '../../lib/utils/outReach';

const TemplateServiceName = 'template';

export default function (app: Application) {
  function sanitizeUserForClient(user) {
    return user;
  }
  async function getEmailTemplate(snug: string, notifierOptions = {}) {
    return new Promise((resolve, reject) => {
      app
        .service(TemplateServiceName)
        ._find({ query: { snug, ...notifierOptions }, paginate: false })
        .then((response) => {
          resolve(response[0] as any);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  return {
    notifier: async (type, user, notifierOptions) => {
      const options = notifierOptions || {};
      options.type = options.type || 'email';
      try {
        const template: any = await getEmailTemplate(type, options);
        if (!template) {
          Logger.error(`${type} template not found`);
          throw new Error(`${type} email template not found`);
        }
        const notifierInstance = new Notifier(EmailerService());
        const sanitizedUser = sanitizeUserForClient(user);
        const { email: to } = sanitizedUser;
        notifierInstance.sendTemplate(to, template?.id, sanitizedUser);
      } catch (error) {
        Logger.error(error);
        throw new Error(error);
      }
    },
  };
}
