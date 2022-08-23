import config from 'config';

/** #region Custom dependencies  */
import { Application } from '../../../declarations';

export default (app: Application) =>
  function createAndSendEmail(
    emailTemplate,
    emailAddress,
    link = null
  ): Promise<any> {
    const from = config.get('sendEmailFrom');
    const email = {
      from,
      to: emailAddress,
      subject: emailTemplate.subject,
      html: emailTemplate.body.replace(/\{link}/g, link),
    };
    return app.service('mailer').create(email);
  };
