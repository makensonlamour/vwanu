/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */

import { Params, Id } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { BadRequest, GeneralError } from '@feathersjs/errors';
// import { QueryTypes } from 'sequelize';
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
   *
   * @param data
   * @param params
   * @returns
   */
  // async create(data: any, params: Params) {

  //   const sequelize = this.app.get('sequelizeClient');
  //   try {
  //     await sequelize.query(
  //       `call proc_add_follower('${params.User.id}', '${data.UserId}')`
  //     );
  //     return Promise.resolve({ message: 'Followed successfully' });
  //   } catch (err) {
  //     if (err.name.includes('SequelizeUniqueConstraintError'))
  //       throw new BadRequest(`Already following ${data.UserId}`);
  //     else throw new Error(err);
  //   }
  // }

  /**
   * This method is used to remove a  follower record
   * @param {Id} id  The id of the user to unFollow
   * @param {params} params - The metadata sent
   * @returns - response from the api
   */
  async remove(id: Id, params: Params) {
    const { User_Follower } = this.app.get('sequelizeClient').models;

    try {
      const res = await User_Follower.destroy({
        where: { UserId: id, FollowerId: params.User.id },
      });
      if (res === 0)
        throw new BadRequest(`You are not following ${params.User.id}`);
      return Promise.resolve({ message: 'Unfollowed successfully' });
    } catch (error) {
      if (error.type === 'FeathersError') throw new BadRequest(error);
      else throw new GeneralError('Could not unfollow');
    }
    // try {
    //   const sequelize = this.app.get('sequelizeClient');

    //   await sequelize.query(
    //     `call proc_remove_follower( '${id}', '${params.User.id}')`
    //   );

    //   return Promise.resolve({ message: 'Unfollowed successfully' });
    // } catch (err) {
    //   console.log(err);
    //   throw new BadRequest('Could not unfollow');
  }
  // },

  // async find(params: Params): Promise<{
  //   total: number;
  //   limit: number;
  //   skip: number;
  //   data: T[];
  // }> {
  //   const sequelize = this.app.get('sequelizeClient');
  //   const { query } = params;
  //   // Extract pagination parameters
  //   const limit = query.$limit || 10;
  //   const skip = query.$skip || 0;

  //   const q =
  //     query.action === 'people-who-follow-me'
  //       ? `get_followers_or_following('${params.User.id}', true)`
  //       : `get_followers_or_following('${params.User.id}', false)`;

  //   try {
  //     const result = await sequelize.query(`SELECT * FROM ${q}`, {
  //       type: QueryTypes.SELECT,
  //     });
  //     console.log(result);
  //     return Promise.resolve({
  //       data: result,
  //       limit,
  //       skip,
  //       total: result.length,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     throw new BadRequest('Could not fetch followers');
  //   }
  //   //   if (!params.provider) return super.find(params);
  //   //   let response = [];
  //   //   const UserModel = this.app.service('users').Model;
  //   //   const { action, UserId } = params.query;
  //   //   const requesterId = UserId || params.User.id;
  //   //   let requester;
  //   //   switch (action) {
  //   //     case 'people-who-follow-me':
  //   //       requester = await UserModel.findOne({
  //   //         where: { id: requesterId },
  //   //         include: [
  //   //           {
  //   //             model: UserModel,
  //   //             as: 'Follower',
  //   //             attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
  //   //           },
  //   //         ],
  //   //       });
  //   //       if (!requester) throw new BadRequest('Could not find your profile');
  //   //       response = requester.Follower;
  //   //       break;
  //   //     case 'people-i-follow':
  //   //       requester = await UserModel.findOne({
  //   //         where: { id: requesterId },
  //   //         include: [
  //   //           {
  //   //             model: UserModel,
  //   //             as: 'Following',
  //   //             attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
  //   //           },
  //   //         ],
  //   //       });
  //   //       if (!requester) throw new BadRequest('Could not find your profile');
  //   //       response = requester.Following;
  //   //       break;
  //   //     default:
  //   //       throw new BadRequest('This action is not supported');
  //   //   }
  //   //   response = response.map((user) => ({
  //   //     id: user.id,
  //   //     firstName: user.firstName,
  //   //     lastName: user.lastName,
  //   //     profilePicture: UrlToMedia(user.profilePicture),
  //   //     createdAt: user.createdAt,
  //   //     updatedAt: user.updatedAt,
  //   //   }));
  //   //   return Promise.resolve(response);
  // }
}
