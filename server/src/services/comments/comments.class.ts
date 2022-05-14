/* eslint-disable no-unused-vars */
import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { BadRequest, GeneralError } from '@feathersjs/errors';
import { Application } from '../../declarations';
import common from '../../lib/utils/common';

const {
  catchAsync,
  sendResponse,
  getUploadedFiles,
  getQueryPagesAndSize,
  getAcceptableQueryParams,
} = common;

// eslint-disable-next-line import/prefer-default-export
export class Comments extends Service {
  app: Application;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data, params: Params) {
    try {
      const commentData = getUploadedFiles(['postImage', 'postVideo'], data);

      const { PostId } = data;

      const db = this.app.get('sequelizeClient').models;
      const post: any = await db.Post.findByPk(PostId);
      if (!post) throw new BadRequest(`No post found with id ${PostId}`);

      const comment = await post.createComment(
        { ...commentData, PostId, UserId: params.User.id },
        { include: [{ model: db.User }, { model: db.Media }] }
      );

      return Promise.resolve(comment);
    } catch (error) {
      throw new GeneralError(error.message);
    }
  }
}
