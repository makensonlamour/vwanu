import config from 'config';
import sendGridMail, { MailDataRequired } from '@sendgrid/mail';
import {
  SendEmailType,
  SendEmailTemplateType,
} from '../../../schema/email.schema';
// Set up
const apiKey = config.get('sendGridApiKey');
sendGridMail.setApiKey(apiKey);

// Main functions
export const sendEmail = async (payload: SendEmailType) =>
  new Promise<void>((resolve, reject) => {
    const message = {
      from: config.get('emailFrom'),
      ...payload,
    };
    sendGridMail
      .send(message as MailDataRequired)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

// Send a template
export const sendTemplate = async (payload: SendEmailTemplateType) => {
  sendEmail(payload);
};
