import { HookContext } from '@feathersjs/feathers';
import Emailer from '../../../lib/utils/mailer';
import { SendEmailTemplateType } from '../../../schema/email.schema';
import logger from '../../../lib/utils/logger';

export default (ctx: HookContext): HookContext => {
  const { data, app } = ctx;
  const { firstName, lastName, email } = data;

  // eslint-disable-next-line no-underscore-dangle
  app
    .service('templates')
    ._get(null, {
      query: {
        name: 'welcome',
      },
    })
    .then(({ templateId, subject }) => {
      const Msg: SendEmailTemplateType = {
        to: email,
        subject,
        templateId,
        personalizations: [
          {
            dynamic_template_data: {
              fullName: `${firstName} ${lastName}`,
            },
          },
        ],
      };

      Emailer.sendTemplate(Msg);
    })
    .catch((err) => {
      logger.error(err);
    });

  return ctx;
};
