import { HookContext } from '@feathersjs/feathers';
import Notifier from '../../../lib/utils/notifier/not';
import { emailer } from '../../../lib/utils/mailer/SendGridMessenger.mailer';

export default async (context: HookContext): Promise<HookContext> => {
  const { result } = context;
  if (!result) return context;
  const notifierInstance = new Notifier(emailer());

  // get the user data
  const { email, activationKey, firstName, lastName } = result;

  const to = email;
  const templateId = 'd-120767cc144b4b2c96d8446ab65c5fe9';
  notifierInstance.sendTemplate(to, templateId, {
    email,
    activationKey,
    firstName,
    lastName,
  });
  return context;
};
