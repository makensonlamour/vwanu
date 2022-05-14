/* eslint-disable no-unused-vars */
import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { GeneralError } from '@feathersjs/errors';

/** Local dependencies */
import common from '../../lib/utils/common';
import { include } from '../../lib/utils/commentPostInclude';
import { Application } from '../../declarations';
/** Global dependencies */
const {
  catchAsync,
  sendResponse,
  getUploadedFiles,
  getQueryPagesAndSize,
  getAcceptableQueryParams,
} = common;
// eslint-disable-next-line import/prefer-default-export
export class Posts extends Service {
  app;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data, params: Params) {
    const postData = getUploadedFiles(['postImage', 'postVideo'], data);
    const post = await this.app
      .service('posts')
      .Model.create(postData, { include: include(this.app) })

    return Promise.resolve(post);
  }
}
