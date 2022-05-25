/* eslint-disable no-unused-vars */
import { Op } from '@sequelize/core';
import { Params, Id } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { BadRequest, NotFound } from '@feathersjs/errors';
/** Local dependencies */
import { Application } from '../../declarations';
import UrlToMedia from '../../lib/utils/UrlToMedia';

const userAttributes = ['firstName', 'lastName', 'id', 'profilePicture'];
// eslint-disable-next-line import/prefer-default-export
export class FriendRequest extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async find(params) {
    const requesterId = params.User.id;
    const { models } = this.app.get('sequelizeClient');
    const user = await models.User.findOne({
      where: { id: requesterId },
      include: [
        {
          model: models.User,
          attributes: userAttributes,
          as: 'friendsRequest',
        },
        {
          model: models.User,
          attributes: userAttributes,
          as: 'FriendshipRequested',
        },
      ],
    });

    if (!user) throw new NotFound('Your profile was not found');

    let response;
    switch (params.query.action) {
      case 'people-i-want-to-be-friend-with':
        response = user.FriendshipRequested.map((User) => ({
          id: User.id,
          firstName: User.firstName,
          lastName: User.lastName,
          profilePicture: UrlToMedia(User.profilePicture),
          createdAt: User.User_friends_Want_to_Be.createdAt,
          updatedAt: User.User_friends_Want_to_Be.updatedAt,
        }));
        break;
      case 'people-who-want-to-Be-my-friend':
        response = user.friendsRequest.map((User) => ({
          id: User.id,
          firstName: User.firstName,
          lastName: User.lastName,
          profilePicture: UrlToMedia(User.profilePicture),
          createdAt: User.User_friends_request.createdAt,
          updatedAt: User.User_friends_request.updatedAt,
        }));
        break;
      default:
        throw new BadRequest('This action does not exist');
    }
    return Promise.resolve(response);
  }

  async create(data, params) {
    const requesterId = params.User.id;
    const friendId = data.UserID;

    if (requesterId.toString() === friendId.toString())
      throw new BadRequest('It is not permitted to be your own friend');
    const { models } = this.app.get('sequelizeClient');

    const people = await models.User.findAll({
      where: { id: { [Op.or]: [requesterId, friendId] } },
      attributes: ['id'],
      include: [
        {
          model: models.User,
          as: 'friendsRequest',
          attributes: userAttributes,
        },
        {
          model: models.User,
          as: 'FriendshipRequested',
          attributes: userAttributes,
        },
      ],
    });

    const requester = people.find(
      (person) => person.id.toString() === requesterId.toString()
    );

    const friend = people.find(
      (person) => person.id.toString() === friendId.toString()
    );

    if (!requester || !friend)
      throw new NotFound(
        'Your profile or the person you want to be friend with was not found'
      );

    const previouslyDeniedFriendRequest = await requester.hasUndesiredFriends(
      friend
    );

    if (previouslyDeniedFriendRequest)
      await requester.removeUndesiredFriends(friend);

    const isUndesiredFriend = await friend.hasUndesiredFriends(requester);
    if (isUndesiredFriend)
      throw new BadRequest('Your previous friend request was denied');

    let alreadyFiends = await Promise.all([
      friend.hasFriend(requester),
      requester.hasFriend(friend),
    ]);

    alreadyFiends = alreadyFiends[0] && alreadyFiends[1];
    if (alreadyFiends) throw new BadRequest('You are already friends');
    const requestedFriendship = await friend.hasFriendsRequest(requester);

    if (requestedFriendship)
      throw new BadRequest('You already requested to be friends');
    await Promise.all([
      friend.addFriendsRequest(requester),
      requester.addFriendshipRequested(friend),
    ]);

    const user2 = await requester.reload();
    const friendRequest = user2.FriendshipRequested.map((User) => ({
      id: User.id,
      firstName: User.firstName,
      lastName: User.lastName,
      profilePicture: UrlToMedia(User.profilePicture),
      createdAt: User.User_friends_Want_to_Be.createdAt,
      updatedAt: User.User_friends_Want_to_Be.updatedAt,
    }));

    return Promise.resolve(friendRequest);
  }

  async patch(id: Id, data, params: Params) {
    return this.app.service('friends').create(data, params);
    //   const { accept, friendsRequestId } = data;
    //   if (friendsRequestId === params.User.id) {
    //     throw new BadRequest('You cannot accept your own friendShip');
    //   }

    //   if (
    //     accept === null ||
    //     accept === undefined ||
    //     friendsRequestId === undefined
    //   )
    //     throw new BadRequest('Please provide the details ');

    //   const Model = this.app.get('sequelizeClient').models.User_friends_request;

    //   // find it in the
    //   let response;
    //   try {
    //     const requestRecord = await Model.findOne({
    //       where: { friendsRequestId, UserId: params.User.id },
    //     });
    //     // then delete it from
    //     if (requestRecord) await requestRecord.destroy();

    //     switch (accept) {
    //       case true:
    //         try {
    //           response = await this.app
    //             .service('friends')
    //             .create({ UserId: params.User.id, friendId: friendsRequestId });
    //         } catch (error) {
    //           throw new Error(error);
    //         }
    //         break;

    //       case false:
    //         response = await this.app
    //           .get('sequelizeClient')
    //           .models.User_friends_undesired.create({
    //             UserId: params.User.id,
    //             undesiredFriendId: friendsRequestId,
    //           });

    //         break;

    //       default:
    //         throw new BadRequest('Parameters provided are not accepted');
    //     }
    //   } catch (err) {
    //     throw new BadRequest(err.message || `could not accept your request`);
    //   }

    //   return Promise.resolve(response);
    // }
  }

  async remove(id, params) {
    const requesterId = params.User.id;
    const { friendId } = params.query;
    const { models } = this.app.get('sequelizeClient');

    if (requesterId.toString() === friendId.toString())
      throw new BadRequest(
        'You are not able to delete a friend request to yourself'
      );

    const people = await models.User.findAll({
      where: { id: { [Op.or]: [requesterId, friendId] } },
      attributes: userAttributes,
      include: [
        {
          model: models.User,
          as: 'friendsRequest',
          attributes: userAttributes,
        },
        {
          model: models.User,
          as: 'FriendshipRequested',
          attributes: userAttributes,
        },
      ],
    });

    const requester = people.find(
      (person) => person.id.toString() === requesterId.toString()
    );
    const friend = people.find(
      (person) => person.id.toString() === friendId.toString()
    );

    if (!friend || !requester)
      throw new BadRequest('This person was not found');
    const hasRequestedFriendship = await requester.hasFriendshipRequested(
      friend
    );

    if (!hasRequestedFriendship)
      throw new NotFound('No friendship records found');

    await Promise.all([
      friend.removeFriendsRequest(requester),
      requester.removeFriendshipRequested(friend),
    ]);

    const user = {
      id: friend.id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      updatedAt: new Date(),
      profilePicture: UrlToMedia(friend.profilePicture),
      createdAt: friend.createdAt,
    };

    return Promise.resolve(user);
  }
}
