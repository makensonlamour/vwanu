import sendGridMail, { MailDataRequired } from '@sendgrid/mail';

import config from 'config';

import { IMessenger } from '../../../schema/email.schema';
import Logger from '../../../lib/utils/logger';

export default class SendGridMessenger implements IMessenger {
  constructor(private apikey, private fromEmail) {
    this.apikey = apikey;
    this.fromEmail = fromEmail;
    sendGridMail.setApiKey(this.apikey);
  }

  send = async (to: string, html: string, subject: string) =>
    new Promise<{ ok: boolean }>((resolve, reject) => {
      const message = {
        from: this.fromEmail,
        to,
        html,
        subject,
      };

      sendGridMail
        .send(message as MailDataRequired)
        .then(() => {
          resolve({ ok: true });
        })
        .catch((error) => {
          Logger.error(error);
          reject(error);
        });
    });

  //   sendEmailTemplate = async (to: string, templateId: string, subject: string) =>
  //     new Promise<{ ok: boolean }>((resolve, reject) => {});
}

export const emailer = (): IMessenger => {
  const emailConfig = config.get('EmailerConfiguration');

  console.log({ emailConfig });
  const messenger = new SendGridMessenger(
    emailConfig.api_key,
    emailConfig.from
  );
  return messenger;
};
