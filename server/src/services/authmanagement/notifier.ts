import config from 'config';

/** Local dependencies */
import { Application } from '../../declarations';

export default function (app: Application) {
  const getLink = (type, hash): string =>
    `${config.get('BASE_URL')}//${type}?token=${hash}`;

  async function getEmailTemplate(snug: string) {
    return app.service('email-template').find({
      query: { snug },
    });
  }
  function createAndSendEmail(link, emailTemplate, emailAddress): Promise<any> {
    const from = config.get('sendEmailFrom');
    const email = {
      from,
      to: emailAddress,
      subject: emailTemplate.subject,
      html: emailTemplate.body.replace(/\{link}/g, link),
    };
    return app.service('mailer').create(email);
  }
  function getEmailSnugFromType(type: string): string {
    switch (type) {
      case 'verifySignup':
        return 'activationConfirmation';
      case 'resendVerifySignup':
        return 'VerifySignup';
      case 'sendResetPwd':
        return 'sendResetPwd';
      case 'resetPwd':
        return 'resetPwd';
      case 'passwordChange':
        return 'passwordChange';
      case 'identityChange':
        return 'identityChange';
      default:
        throw new Error('This type is not supported');
    }
  }
  function getEmailTemplateSendEmail(type, user) {
    const snug = getEmailSnugFromType(type);
    const tokenLink = getLink('verify', user.activationKey);
    return new Promise((resolve, reject) => {
      getEmailTemplate(snug)
        .then((response) => {
          const { data } = response as any;
          const emailTemplate = data.length > 0 ? data[0] : false;
          if (!emailTemplate) {
            throw new Error(`The ${type} template email is not setup yet`);
          }

          createAndSendEmail(tokenLink, emailTemplate, user.email)
            .then((result) => {
              if (!result.response || !result.response.includes('250'))
                throw new Error('Error sending email');
              resolve(result);
            })
            .catch((error) => {
              console.error('\n\n\n\n Create and send email \n\n\n\n');
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  return {
    // eslint-disable-next-line no-unused-vars
    notifier: async (type, user, notifierOptions) => {
      if (!notifierOptions) return getEmailTemplateSendEmail(type, user);
      return Promise.reject();
    },
  };
}
