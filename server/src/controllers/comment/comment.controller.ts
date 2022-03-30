import _ from 'lodash';
import { Op } from '@sequelize/core';
import { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/** Local dependencies */
import db from '../../models';
import AppError from '../../errors';
import common from '../../lib/utils/common';
import PostService from '../../services/post/post.service';
import { editCommentInput, getOnePostInput } from '../../schema/post';

interface MulterRequest extends Request {
  files: any;
}

const {
  catchAsync,
  sendResponse,
  getAcceptableQueryParams,
  getQueryPagesAndSize,
  getUploadedFiles,
} = common;

export const createOne = catchAsync(
  async (req: MulterRequest, res: Response) => {
    try {
      const data = getUploadedFiles(['postImage', 'postVideo'], req);

      let { PostId, UserId } = data;

      PostId = parseInt(PostId, 10);
      UserId = parseInt(PostId, 10);
      const post: any = await PostService.findOne(PostId);
      if (!post)
        throw new AppError('No post found for this id', StatusCodes.NOT_FOUND);

      const comment = await post.createComment(
        { ...data, PostId, UserId },
        { include: [{ model: db.User }] }
      );

      return sendResponse(res, StatusCodes.CREATED, { comment }, 'created');
    } catch (error) {
      throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const limitAndOffset = getQueryPagesAndSize(req);
  const query = getAcceptableQueryParams(['UserId', 'PostId'], req);
  const { rows, count }: any = await PostService.findMany(
    {
      [Op.or]: query,
    },
    {
      include: [
        { model: db.Media },
        { model: db.User, attributes: ['firstName', 'lastName', 'id'] },
      ],
      ...limitAndOffset.offsetAndLimit,
      attributes: { exclude: ['UserId'] },
    }
  );

  if (!rows) throw new AppError('No comment found', StatusCodes.NOT_FOUND);
  sendResponse(
    res,
    StatusCodes.OK,
    { posts: rows, count, totalPages: limitAndOffset.getTotalPages(count) },
    ReasonPhrases.OK
  );
});

export const getOne = catchAsync(
  async (req: Request<getOnePostInput, {}, {}>, res: Response) => {
    const comment = await PostService.findOne(
      parseInt(req.params.id.toString(), 10),
      {
        include: [
          { model: db.Media },
          { model: db.User, attributes: ['firstName', 'lastName', 'id'] },
        ],
        attributes: { exclude: ['UserId'] },
      }
    );
    if (!comment)
      throw new AppError(
        'No Post found with the specified id',
        StatusCodes.NOT_FOUND
      );

    return sendResponse(res, StatusCodes.OK, { comment }, ReasonPhrases.OK);
  }
);

export const editOne = catchAsync(
  async (
    req: Request<editCommentInput['params'], editCommentInput['body'], {}>,
    res: Response
  ) => {
    let comment = await PostService.findOne(req.params.id);
    if (!comment)
      throw new AppError('There is no comment', StatusCodes.NOT_FOUND);
    const data = _.omit(req.body, ['PostId']);
    comment = await PostService.editOne(comment, data);
    sendResponse(res, StatusCodes.OK, { comment }, ReasonPhrases.OK);
  }
);

export const deleteOne = catchAsync(
  async (req: Request<getOnePostInput, {}, {}>, res: Response) => {
    let comment = await PostService.findOne(
      parseInt(req.params.id.toString(), 10)
    );
    if (!comment)
      throw new AppError(
        'Your comment is either already removed or never existed',
        StatusCodes.NOT_FOUND
      );
    comment = await PostService.deleteOne(comment);
    sendResponse(res, StatusCodes.OK, { comment }, ReasonPhrases.OK);
  }
);

export default { createOne, getUsersPost: getAll, getOne, editOne, deleteOne };
