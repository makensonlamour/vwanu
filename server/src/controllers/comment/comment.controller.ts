import _ from 'lodash';
import { Op } from '@sequelize/core';
import { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/** Local dependencies */
import db from '../../models';
import AppError from '../../errors';
import common from '../../lib/utils/common';
import PostService from '../../services/post/post.service';
import { include } from '../../lib/utils/commentPostInclude';
import { editCommentInput, getOnePostInput } from '../../schema/post';

interface MulterRequest extends Request {
  files: any;
}

const { catchAsync, sendResponse, getQueryPagesAndSize, getUploadedFiles } =
  common;

export const createOne = catchAsync(
  async (req: MulterRequest, res: Response) => {
    try {
      const data = getUploadedFiles(['postImage', 'postVideo'], req);

      let { PostId, UserId } = data;

      PostId = parseInt(PostId, 10);
      UserId = parseInt(UserId, 10);
      const post: any = await PostService.findOne(PostId);
      if (!post)
        throw new AppError('No post found for this id', StatusCodes.NOT_FOUND);

      const comment = await post.createComment(
        { ...data, PostId, UserId },
        { include: [{ model: db.User }, { model: db.Media }] }
      );

      return sendResponse(res, StatusCodes.CREATED, { comment }, 'created');
    } catch (error) {
      throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const limitAndOffset = getQueryPagesAndSize(req);
  const { UserId, PostId } = req.query;
  let query = {};
  if (UserId) query = { UserId };
  else query = { PostId };

  const { rows, count }: any = await PostService.findMany(
    {
      [Op.and]: [query, { PostId: { [Op.not]: null } }],
    },
    {
      include,
      ...limitAndOffset.offsetAndLimit,
      attributes: { exclude: ['UserId'] },
    }
  );

  if (!rows) throw new AppError('No comment found', StatusCodes.NOT_FOUND);
  sendResponse(
    res,
    StatusCodes.OK,
    { comment: rows, count, totalPages: limitAndOffset.getTotalPages(count) },
    ReasonPhrases.OK
  );
});

export const getOne = catchAsync(
  async (req: Request<getOnePostInput, {}, {}>, res: Response) => {
    const comment = await PostService.findOne(
      parseInt(req.params.id.toString(), 10),
      {
        include,
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
    let data = getUploadedFiles(['postImage', 'postVideo'], req as Request);
    data = _.omit(req.body, ['PostId', 'UserId']);
    comment = await PostService.editOne(comment, data, {
      include,
      attributes: { exclude: ['UserId'] },
    });
    sendResponse(res, StatusCodes.OK, { comment }, ReasonPhrases.OK);
  }
);

export const deleteOne = catchAsync(
  async (req: Request<getOnePostInput, {}, {}>, res: Response) => {
    try {
      let comment: any = await PostService.findOne(
        parseInt(req.params.id.toString(), 10)
      );
      if (!comment)
        throw new AppError(
          'Your comment is either already removed or never existed',
          StatusCodes.NOT_FOUND
        );
      comment = await PostService.deleteOne(comment);

      sendResponse(
        res,
        StatusCodes.OK,
        { comment: comment.id },
        ReasonPhrases.OK
      );
    } catch (err) {
      throw new AppError(err.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export default { createOne, getAll, getOne, editOne, deleteOne };
