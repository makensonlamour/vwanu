import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
/** Local dependencies */
import common from '../../lib/utils/common';
import { Application } from '../../declarations';
/** Global dependencies */
const { getUploadedFiles } = common;
// eslint-disable-next-line import/prefer-default-export
export class Discussion extends Service {
  app;

  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  // eslint-disable-next-line no-unused-vars
  async create(data, params: Params) {
    const discussionData = getUploadedFiles(
      ['discussionImage', 'discussionVideo'],
      data
    );
    const discussion = await this.app
      .service('discussion')
      .Model.create(discussionData, {
        include: [{ model: this.app.get('sequelizeClient').models.Media }],
      });

    return Promise.resolve(discussion);
  }
}
