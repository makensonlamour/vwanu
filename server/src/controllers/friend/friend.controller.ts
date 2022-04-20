import { Op } from '@sequelize/core';
import { Response, Request } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// Custom requirements
import db from '../../models';
import AppError from '../../errors';
import common from '../../lib/utils/common';
import userService from '../../services/user/dataProvider';
import { userAttributes } from '../../lib/utils/commentPostInclude';

import { getRequesterAndRequest } from '../../lib/utils/UsersCommon';

const { catchAsync, sendResponse } = common;

export default {
  addFriend: catchAsync(async (req: Request, res: Response) => {
    const requesterId = req.user.id.toString();
    let { friendId } = req.body;
    friendId = friendId.toString();

    getRequesterAndRequest(requesterId, friendId, [
      {
        model: db.User,
        as: 'friends',
        attributes: userAttributes,
      },
      {
        model: db.User,
        as: 'undesiredFriends',
        attributes: userAttributes,
      },
    ])
      .then(async ({ requester, request }: any) => {
        const hasRequest = await requester.hasFriendsRequest(request);
        if (!hasRequest)
          throw new AppError(
            'This person never requested a friend request',
            StatusCodes.BAD_REQUEST
          );
        let alreadyFiends = await Promise.all([
          request.hasFriend(requester),
          requester.hasFriend(request),
        ]);

        alreadyFiends = alreadyFiends[0] && alreadyFiends[1];
        // if (action === 'add-friend') {
        if (alreadyFiends)
          throw new AppError(
            'You are already friends',
            StatusCodes.BAD_REQUEST
          );

        if (req.body.accept)
          await Promise.all([
            requester.addFriend(request),
            request.addFriend(requester),
            requester.addFollowing(request),
            request.addFollowing(requester),
            requester.addFollower(request),
            request.addFollower(requester),
          ]);
        else await requester.addUndesiredFriends(request);

        await Promise.all([
          requester.removeFriendsRequest(request),
          request.removeFriendshipRequested(requester),
        ]);

        const newU = await requester.reload();

        sendResponse(res, StatusCodes.OK, { user: newU }, ReasonPhrases.OK);
      })
      .catch((err) => {
        throw new AppError(
          err.message ||
            'Your profile or the profile of the person you want to be friend with was not found',
          StatusCodes.NOT_FOUND
        );
      });
  }),

  getFriends: catchAsync(async (req: Request, res: Response) => {
    const requester: any = await userService.getUser(req.user.id.toString(), {
      attributes: userAttributes,
      include: [
        {
          model: db.User,
          as: 'friends',
          attributes: userAttributes,
        },
      ],
    });

    if (!requester)
      throw new AppError(
        'Could not find your profiles or friends list',
        StatusCodes.NOT_FOUND
      );

    sendResponse(res, StatusCodes.OK, { user: requester }, ReasonPhrases.OK);
  }),

  removeFriend: catchAsync(async (req: Request, res: Response) => {
    const requesterId = req.user.id.toString();
    const friendId = req.body.friendId.toString();

    if (requesterId === friendId)
      throw new AppError(
        'You are not able remove your own friendship',
        StatusCodes.BAD_REQUEST
      );

    const people = await db.User.findAll({
      where: { id: { [Op.or]: [requesterId, friendId] } },
      include: [
        {
          model: db.User,
          as: 'friends',
          attributes: userAttributes,
        },
      ],
    });

    const requester = people.find(
      (person) => person.id.toString() === requesterId
    );
    const friend = people.find((person) => person.id.toString() === friendId);

    const areFriends = await requester.hasFriend(friend);

    if (!areFriends)
      throw new AppError(
        "You cannot remove as friend you've never been friends",
        StatusCodes.BAD_REQUEST
      );
    await Promise.all([
      friend.removeFriend(requester),
      requester.removeFriend(friend),
    ]);

    const newU = await requester.reload();
    sendResponse(res, StatusCodes.OK, { user: newU }, ReasonPhrases.OK);
  }),
};
