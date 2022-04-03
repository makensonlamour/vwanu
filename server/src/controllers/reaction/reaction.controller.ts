import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/** Global dependencies */
import db from '../../models';
import AppError from '../../errors';
import common from '../../lib/utils/common';
import PostService from '../../services/post/post.service';
import ReactionService from '../../services/reaction/reaction.service';
import { include, ReactionInclude } from '../../lib/utils/commentPostInclude';
import {
  createPostReactionInput,
  getReactionInput,
  editReactionInput,
} from '../../schema/reaction.schema';

const { catchAsync, sendResponse } = common;

export const createOne = catchAsync(
  async (
    req: Request<{}, {}, createPostReactionInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const post: any = await PostService.findOne(
        parseInt(req.body.PostId.toString(), 10),
        { include }
      );
      if (!post) throw new AppError('No post found', 404);

      await post.createReaction(req.body);

      const postToReturn =
        post.PostId === null
          ? await post.reload()
          : await PostService.findOne(post.PostId, {
              include,
            });

      return sendResponse(
        res,
        StatusCodes.CREATED,
        { post: postToReturn },
        ReasonPhrases.CREATED
      );
    } catch (error) {
      const { message, status = 500 } = error;
      return next({ message, status });
    }
  }
);

export const getOne = catchAsync(
  async (
    req: Request<getReactionInput, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reaction = await ReactionService.findOne(
        parseInt(req.params.id.toString(), 10),
        { include: ReactionInclude }
      );

      if (!reaction)
        throw new AppError(
          'No react found with that id',
          StatusCodes.NOT_FOUND
        );

      return sendResponse(res, StatusCodes.OK, { reaction }, ReasonPhrases.OK);
    } catch (error) {
      const { message, status = 500 } = error;
      return next({ message, status });
    }
  }
);

export const editOne = catchAsync(
  async (
    req: Request<editReactionInput['params'], {}, editReactionInput['body']>,
    res: Response
  ) => {
    let reaction = await ReactionService.findOne(
      parseInt(req.params.id.toString(), 10),
      {
        include: [
          {
            model: db.User,
            attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
          },
        ],
      }
    );
    if (!reaction)
      throw new AppError('No reaction with that id', StatusCodes.NOT_FOUND);

    reaction = await ReactionService.editOne(
      reaction,
      {
        content: req.body.content,
      },
      {
        include: [
          {
            model: db.User,
            attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
          },
        ],
      }
    );

    return sendResponse(res, StatusCodes.OK, { reaction }, ReasonPhrases.OK);
  }
);

export const deleteOne = catchAsync(
  async (req: Request<getReactionInput, {}, {}>, res: Response) => {
    const reaction: any = await ReactionService.findOne(
      parseInt(req.params.id.toString(), 10)
    );

    if (!reaction)
      throw new AppError('No reaction found', StatusCodes.NOT_FOUND);

    await ReactionService.deleteOne(reaction);

    return sendResponse(
      res,
      StatusCodes.OK,
      { reaction: { id: reaction.id } },
      ReasonPhrases.OK
    );
  }
);
