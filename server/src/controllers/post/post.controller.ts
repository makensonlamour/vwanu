import _ from 'lodash';
import { Op } from '@sequelize/core';

import { Response, Request } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
/** Local dependencies */

import db from '../../models';
import AppError from '../../errors';
import common from '../../lib/utils/common';
import PostService from '../../services/post/post.service';

interface MulterRequest extends Request {
  files: any;
}
/** Global dependencies */
const { catchAsync, sendResponse } = common;
const userAttributes = ['firstName', 'lastName', 'id', 'profilePicture'];

export const createOne = catchAsync(
  async (req: MulterRequest, res: Response) => {
    try {
      const data = req.body;
      const documentFiles = (req as MulterRequest).files;
      if (documentFiles?.postImage || documentFiles?.postVideo) {
        data.Media = [];
        const mediaArray = ['postImage', 'postVideo'];
        mediaArray.forEach((mediaGroup) => {
          if (documentFiles[mediaGroup]) {
            data.Media.push({
              original: documentFiles[mediaGroup][0].path,
              UserId: data.UserId,
            });
          }
        });
      }

      const post = await PostService.createOne(data, {
        include: [{ model: db.Media, attributes: userAttributes }],
      });
      return sendResponse(res, StatusCodes.CREATED, { post }, 'created');
    } catch (error) {
      throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const { page, size, ...data } = req.query;

  const pageAsNumber = Number.parseInt(page as string, 10);
  const sizeAsNumber = Number.parseInt(size as string, 10);

  let pages = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) pages = pageAsNumber;

  let sizes = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < sizes)
    sizes = sizeAsNumber;

  const query = Object.keys(data).map((key) => {
    if (['UserId'].some((criteria) => criteria === key)) {
      // if (key === 'UserId')
      //   return {
      //     UserId: {
      //       [Op.or]: [
      //         data.UserId,
      //         db.sequelize.literal(
      //           `select id from User where id=${data.UserId}`
      //         ),
      //       ],
      //     },
      //   };

      return { [key]: data[key] };
    }
    return null;
  });

  const { rows, count }: any = await PostService.findMany(
    {
      [Op.and]: query,
    },
    {
      include: [
        { model: db.Media },

        {
          model: db.Post,
          as: 'Comments',
          include: [{ model: db.User, attributes: userAttributes }],
        },
        {
          model: db.User,
          attributes: userAttributes,
        },

      ],
      limit: sizes,
      offset: pages * sizes,
      attributes: { exclude: ['UserId'] },
    }
  );



  if (!rows) throw new AppError('No Post found', StatusCodes.NOT_FOUND);

  sendResponse(
    res,
    StatusCodes.OK,
    { posts: rows, count, totalPages: Math.ceil(count / sizes) },
    ReasonPhrases.OK
  );
});

export const editOne = catchAsync(async (req: Request, res: Response) => {
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
});

export const getOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.findOne(parseInt(id, 10), {
    include: [
      { model: db.Media },

      {
        model: db.Post,
        as: 'Comments',
        include: [
          {
            model: db.User,
            attributes: userAttributes,
          },
        ],
      },
      {
        model: db.User,
        attributes: userAttributes,
      },

    ],
    attributes: { exclude: ['UserId'] },
  });
  if (!post)
    throw new AppError(
      'No Post found with the specified id',
      StatusCodes.NOT_FOUND
    );

  return sendResponse(res, StatusCodes.OK, { post }, ReasonPhrases.OK);
});

export const deleteOne = catchAsync(async (req: Request, res: Response) => {
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

