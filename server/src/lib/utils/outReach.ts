/* eslint-disable import/prefer-default-export */
import config from 'config';

// Custom dependencies
import { IMessenger } from '../../schema/email.schema';
import SendGridMessenger from './mailer/SendGridMessenger.mailer';

export const EmailerService = (): IMessenger => {
  const emailConfig = config.get('EmailerConfiguration');
  const messenger = new SendGridMessenger(
    emailConfig.api_key,
    emailConfig.from
  );
  return messenger;
};
