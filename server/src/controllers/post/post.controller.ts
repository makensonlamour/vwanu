import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Response, Request } from 'express';
import { Op } from '@sequelize/core';

import PostService from '../../services/post/post.service';
import AppError from '../../errors';

// Custom requirements
import db from '../../models';
import common from '../../lib/utils/common';

interface MulterRequest extends Request {
  files: any;
}

const { catchAsync, sendResponse } = common;

export const createOne = catchAsync(
  async (req: MulterRequest, res: Response) => {
    try {
      const data = req.body;
      const documentFiles = (req as MulterRequest).files;
      if (documentFiles?.postImage || documentFiles?.postVideo) {
        data.Media = [];
        const mediaArray = ['postImage', 'postVideo'];
        mediaArray.forEach((mediaGroup) => {
          if (documentFiles[mediaGroup])
            data.Media.push({ original: documentFiles[mediaGroup][0].path });
        });
      }

      const post = await PostService.createOne(data, { include: [db.Media] });
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
    if (['UserId'].some((criteria) => criteria === key))
      return { [key]: data[key] };
    return null;
  });

  const { rows, count }: any = await PostService.findMany(
    {
      [Op.or]: query,
    },
    { include: [{ model: db.Media }], limit: sizes, offset: pages * sizes }
  );
  if (!rows) throw new AppError('No Post found erro', StatusCodes.NOT_FOUND);

  sendResponse(
    res,
    StatusCodes.OK,
    { posts: rows, count, totalPages: Math.ceil(count / sizes) },
    ReasonPhrases.OK
  );
});
// export const editOne = catchAsync(async (req, res) => {})
// export const getOne = catchAsync(async (req, res) => {})
// export const deleteOne = catchAsync(async (req, res) => {})
// export const getAll = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const post = await PostService.find
// });
// export const getTimeline = catchAsync(async (req, res) => {})

// editOne, getOne, deleteOne, getAll, getTimeline
export default { createOne, getUsersPost: getAll };
