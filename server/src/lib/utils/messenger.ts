/* eslint-disable no-underscore-dangle */
import Logger from './logger';
import { Application } from '../../declarations';
import Notifier from './notifier/not';
import { EmailerService } from './outReach';
import getTemplate from './getTemplate';
import sanitizeUserFor3rdParty from './sanitizer/sanitizerFor3rdParty';

export default function (app: Application) {
  const getMessageTemplateFunction = getTemplate(app);
  return {
    notifier: async (type, user, notifierOptions) => {
      const options = notifierOptions || {};
      options.type = options.type || 'email';
      try {
        const template: any = await getMessageTemplateFunction(type, options);
        if (!template) {
          Logger.error(`${type} template not found`);
          throw new Error(`${type} email template not found`);
        }
        const notifierInstance = new Notifier(EmailerService());
        const sanitizedUser = sanitizeUserFor3rdParty(user);
        const { email: to } = sanitizedUser;
        notifierInstance.sendTemplate(to, template?.id, sanitizedUser);
      } catch (error) {
        Logger.error(error);
        throw new Error(error);
      }
    },
  };
}
