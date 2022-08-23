/** #region Custom dependencies  */
import sendEmail from '../mailer/sendEmail';
import { Application } from '../../../declarations';
import { NotifierOptions } from '../../../schema/notifier';
import pushNotification from '../pushNotification/pushNotification';
/** #endregion   */

export default (app: Application) =>
  async function (notifierOption: NotifierOptions, receiver, message) {
    const { via, ...options } = notifierOption;
    switch (via) {
      case 'mail':
        await sendEmail(app)(message, receiver.email, options.link);
        break;
      case 'mobilePushNotification':
        await pushNotification(via, message, receiver.pushNotificationToken);
        break;
      default:
        throw new Error('Notifier type not supported');
    }
  };
