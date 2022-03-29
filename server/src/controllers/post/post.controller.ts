import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Response, Request } from 'express';
import { Op } from '@sequelize/core';
// import { QueryTypes } from 'sequelize';

import PostService from '../../services/post/post.service';
// import UserService from '../../services/user/dataProvider';
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
          if (documentFiles[mediaGroup]) {
            data.Media.push({
              original: documentFiles[mediaGroup][0].path,
              UserId: data.UserId,
            });
          }
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
        { model: db.User, attributes: ['firstName', 'lastName', 'id'] },
      ],
      limit: sizes,
      offset: pages * sizes,
      attributes: { exclude: ['UserId'] },
    }
  );
  // const records = await db.sequelize.query('dt');
  // console.log(JSON.stringify(records, null, 2));
  // console.log('will make request ');

  // const { rows, count }: any = await db.Post.findAll({
  //   where: {
  //     UserId: {
  //       [Op.or]: [
  //         db.sequelize.literal(
  //           `SELECT UserId FROM User_Follower WHERE FollowerId=1`
  //         ),
  //       ],
  //     },
  //   },
  // });

  // console.log('Request made ', rows);

  // UserService.getUser(req.query.UserId as string)
  //   .then(async (user: any) => {
  //     if (user) {
  //       console.log(user);
  //       console.log('\n\n Here is the follower\n\n');
  //       const follower = await user.getFollower();
  //       console.log({ follower });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('error', err);
  //   });

  if (!rows) throw new AppError('No Post found', StatusCodes.NOT_FOUND);

  sendResponse(
    res,
    StatusCodes.OK,
    { posts: rows, count, totalPages: Math.ceil(count / sizes) },
    ReasonPhrases.OK
  );
});
// export const editOne = catchAsync(async (req, res) => {})
export const getOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.findOne(parseInt(id, 10), {
    include: [
      { model: db.Media },
      { model: db.User, attributes: ['firstName', 'lastName', 'id'] },
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
// export const deleteOne = catchAsync(async (req, res) => {})
// export const getAll = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const post = await PostService.find
// });
// export const getTimeline = catchAsync(async (req, res) => {})

// editOne, getOne, deleteOne, getAll, getTimeline
export default { createOne, getUsersPost: getAll };
