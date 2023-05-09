/* eslint-disable no-underscore-dangle */
import { Application } from '../../declarations';
import { MsgTemplate } from '../../schema/MsgTemplate.schema';

const formatQuery = (query: {} | string): {} =>
  typeof query === 'string' ? { query } : query;

const createLink = (key: string, value) =>
  `http://localhost:4000/${key}/${value}`;

class TemplateController {
  template: MsgTemplate;

  data: any;

  constructor(template, data) {
    this.template = template;
    this.data = data;
  }

  render() {
    const { template, data } = this;
    let { body } = template;
    const { data: rest } = data;

    Object.keys(rest).forEach((key) => {
      body = body.replace(`{{${key}}}`, createLink(key, rest[key]));
      return 0;
    });
    return { subject: template.subject, body };
  }
}

export default (app: Application) =>
  async ({
    query,
    user,
    data,
  }): Promise<Pick<MsgTemplate, 'body' | 'subject'>> => {
    try {
      const template = await app
        .get('sequelizeClient')
        .models.EmailTemplate.findOne({
          where: formatQuery(query),
        });

      if (!template) throw new Error('Template not found');
      const Template = new TemplateController(template, { data, user });
      return Template.render();
    } catch (error) {
      throw new Error(error);
    }
  };
