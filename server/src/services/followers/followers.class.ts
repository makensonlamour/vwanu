/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */

import { Params, Id } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

/** Local dependencies */
import { Application } from '../../declarations';

/**
 * A class for the followers service
 */
export class Followers extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  /**
   * This method is used to remove a  follower record
   * @param {Id} id  The id of the user to unFollow
   * @param {params} params - The metadata sent
   * @returns - response from the api
   */
  async remove(id: Id, params: Params) {
    const { User_Follower, User_Following } =
      this.app.get('sequelizeClient').models;

    await User_Following.destroy({
      where: {
        FollowingId: id,
        UserId: params.User.id,
      },
    });
    const res = await User_Follower.destroy({
      where: { UserId: id, FollowerId: params.User.id },
    });

    return Promise.resolve(res);
  }
}

// async find(params: Params) {
//   if (!params.provider) return super.find(params);

//   let response = [];
//   const UserModel = this.app.service('users').Model;
//   const { action, UserId } = params.query;
//   const requesterId = UserId || params.User.id;

//   let requester;

//   switch (action) {
//     case 'people-who-follow-me':
//       requester = await UserModel.findOne({
//         where: { id: requesterId },

//         include: [
//           {
//             model: UserModel,
//             as: 'Follower',
//             attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
//           },
//         ],
//       });

//       if (!requester) throw new BadRequest('Could not find your profile');
//       response = requester.Follower;
//       break;

//     case 'people-i-follow':
//       requester = await UserModel.findOne({
//         where: { id: requesterId },

//         include: [
//           {
//             model: UserModel,
//             as: 'Following',
//             attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
//           },
//         ],
//       });

//       if (!requester) throw new BadRequest('Could not find your profile');
//       response = requester.Following;

//       break;
//     default:
//       throw new BadRequest('This action is not supported');
//   }

//   response = response.map((user) => ({
//     id: user.id,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     profilePicture: UrlToMedia(user.profilePicture),
//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt,
//   }));

//   return Promise.resolve(response);
// }
