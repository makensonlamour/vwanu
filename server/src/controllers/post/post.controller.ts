import _ from 'lodash';
import { Op } from '@sequelize/core';
import { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/** Local dependencies */

import AppError from '../../errors';
import common from '../../lib/utils/common';
import PostService from '../../services/post/post.service';
import { include } from '../../lib/utils/commentPostInclude';
import { editPostInput, getOnePostInput } from '../../schema/post';

interface MulterRequest extends Request {
  files: any;
}

/** Global dependencies */
const {
  catchAsync,
  sendResponse,
  getUploadedFiles,
  getQueryPagesAndSize,
  getAcceptableQueryParams,
} = common;

export const createOne = catchAsync(
  async (req: MulterRequest, res: Response) => {
    try {
      const data = getUploadedFiles(['postImage', 'postVideo'], req);
      const post = await PostService.createOne(data, { include });
      return sendResponse(res, StatusCodes.CREATED, { post }, 'created');
    } catch (error) {
      throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const limitAndOffset = getQueryPagesAndSize(req);
  const query = getAcceptableQueryParams(['UserId'], req);
  const { rows, count }: any = await PostService.findMany(
    {
      [Op.and]: query,
    },
    {
      include,
      ...limitAndOffset.offsetAndLimit,
      attributes: { exclude: ['UserId'] },
    }
  );

  if (!rows) throw new AppError('No Post found', StatusCodes.NOT_FOUND);

  sendResponse(
    res,
    StatusCodes.OK,
    { posts: rows, count, totalPages: limitAndOffset.getTotalPages(count) },
    ReasonPhrases.OK
  );
});

export const editOne = catchAsync(
  async (
    req: Request<editPostInput['params'], editPostInput['body'], {}>,
    res: Response
  ) => {
    const post = await PostService.findOne(
      parseInt(req.params.id.toString(), 10)
    );
    if (!post)
      throw new AppError(
        'No post found with the id provided',
        StatusCodes.NOT_FOUND
      );

    const data = _.omit(req.body, ['id', 'UserId', 'PostId']);
    const editedPost = await PostService.editOne(post, data);
    sendResponse(res, StatusCodes.OK, { post: editedPost }, ReasonPhrases.OK);
  }
);

export const getOne = catchAsync(
  async (req: Request<getOnePostInput, {}, {}>, res: Response) => {
    const { id } = req.params;
    const post = await PostService.findOne(parseInt(id.toString(), 10), {
      include,
      attributes: { exclude: ['UserId'] },
    });
    if (!post)
      throw new AppError(
        'No Post found with the specified id',
        StatusCodes.NOT_FOUND
      );

    return sendResponse(res, StatusCodes.OK, { post }, ReasonPhrases.OK);
  }
);

export const deleteOne = catchAsync(async (req: Request<getOnePostInput, {}, {}>, res: Response) => {
  let post: any = await PostService.findOne(
    parseInt(req.params.id.toString(), 10)
  );
  if (!post)
    throw new AppError(
      'Your post is either already deleted of never existed',
      StatusCodes.NOT_FOUND
    );
  post = await PostService.deleteOne(post);

  sendResponse(
    res,
    StatusCodes.GONE,
    { post: { id: post.id } },
    'Post delete with success'
  );
});

export default { createOne, getAll, editOne, getOne, deleteOne };
