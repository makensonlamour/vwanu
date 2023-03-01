import { HookContext } from '@feathersjs/feathers';

/** Local dependencies * */
import { Application } from '../../../declarations';
import notifier from '../../../lib/utils/notifier.lib';
import messagePicker from '../../../lib/utils/messagePicker.utils';

/**
 * Send a welcome email to newly created accounts.
 * @returns {Promise<HookContext>}
 */
export default async (context: HookContext): Promise<HookContext> => {
  const { app, result } = context;
  // if (!app.get('SEND_WELCOME_EMAIL')) return context;

  if (!result) throw new Error('User was not created');

  const { activationKey } = result;

  try {
    // find a template,
    const template = await messagePicker(app as Application)({
      query: { snug: 'WelcomeSignup' },
      user: context.result,
      data: { link: activationKey },
    });

    if (!template) throw new Error('Message not found');

    notifier(app as Application)({
      channel: 'email',
      user: {
        email: context.result.email,
      },
      message: {
        subject: template.subject,
        body: template.body,
      },
    });
    return context;
  } catch (error) {
    const err = `Error sending message: ${error.message}`;
    throw new Error(error.message || error || err);
  }
};
