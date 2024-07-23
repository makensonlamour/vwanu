/* eslint-disable no-underscore-dangle */
import { Application } from '../../declarations';

import { MessageTemplateInterface } from '../../schema/messageTemplate';

import { NotifierOptions } from '../../schema/email.schema'


/**
 * @param {Application} app | FeathersJS application instance
 * @returns {Function} | Returns a get_template_function that returns a promise
 * @description
 */
export default (app: Application) =>
  /**
   *
   * @param snug | a unique text that identifies a template
   * @param notifierOptions | an object that contains the type of template and all other options to find the template by
   * @returns | Returns a promise that resolves to a template object
   */
  async (
    snug: Pick<MessageTemplateInterface, 'snug'>,
    notifierOptions: NotifierOptions = { source: 'email' }
  ): Promise<MessageTemplateInterface> => {
    const TemplateServiceName = notifierOptions.source === 'email' ? 'template' : 'template_messages';

    return new Promise((resolve, reject) => {
      app
        .service(TemplateServiceName)
        ._find({ query: { snug }, paginate: false })
        .then((response) => {
          resolve(response[0] as any);
        })
        .catch((error) => {
          reject(error);
        });
    })
  };
