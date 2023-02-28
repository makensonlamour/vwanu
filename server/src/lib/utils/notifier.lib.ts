import Logger from './logger';
import { Application } from '../../declarations';
import NotifierOptions, { User } from '../../schema/notifier.schema';

const getNotificationData = (
  data: Pick<NotifierOptions, 'user' | 'channel'>
) => {
  const { channel } = data;
  return {
    to: data.user[channel],
  };
};

type EmailData = {
  to: string;
  subject: string;
  body: string;
};
const senEmail =
  (app: Application) =>
  async (emailData: EmailData): Promise<void> => {
    try {
      const { to, subject, body } = emailData;
      const email = {
        to,
        subject,
        html: body,
      };
      await app.service('mailer').create(email);
    } catch (err) {
      const error = `Could not notify user`;
      Logger.error(err.message || err || error);
    }
  };

export default (app: Application) =>
  async (notifierOptions: NotifierOptions): Promise<void> => {
    try {
      if (User.parse(notifierOptions.user)) {
        const { channel, user, message } = notifierOptions;
        const channels = {
          email: senEmail(app),
        };
        const notificationData = {
          ...message,
          ...getNotificationData({ user, channel }),
        };

        await channels[channel](notificationData);
      }
    } catch (err) {
      const error = `Could not notify user ${JSON.stringify(
        notifierOptions.user
      )} via channel 
        ${err.message}`;
      const e = err.message || err || error;
      Logger.error(e);
      throw new Error(e);
    }
  };
