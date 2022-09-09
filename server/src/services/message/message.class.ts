/* eslint-disable no-unused-vars */
import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

/** Local dependencies */
import common from '../../lib/utils/common';
import { include } from '../../lib/utils/commentPostInclude';
import { Application } from '../../declarations';

const { getUploadedFiles } = common;
// eslint-disable-next-line import/prefer-default-export
export class Message extends Service {
  app;

  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data, params: Params) {
    const messageData = getUploadedFiles(['messageImage'], data);
    const message = await this.app
      .service('message')
      .Model.create(messageData, {
        include: [{ model: this.app.get('sequelizeClient').models.Media }],
      });

    return Promise.resolve(message);
  }
}
