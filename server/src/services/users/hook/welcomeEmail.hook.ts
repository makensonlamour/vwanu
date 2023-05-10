import { HookContext } from '@feathersjs/feathers';
import Notifier from '../../../lib/utils/notifier/not';
import { emailer } from '../../../lib/utils/mailer/SendGridMessenger.mailer';

export default async (context: HookContext): Promise<HookContext> => {
  const { result } = context;
  if (!result) return context;
  const notifierInstance = new Notifier(emailer());

  // get the user data
  const { email, activationKey, firstName } = result;

  const subject = 'Welcome to the Snug API';
  const html = `${firstName}your activation key is ${activationKey}`;
  const to = email;
  notifierInstance.send(to, html, subject);
  return context;
};
