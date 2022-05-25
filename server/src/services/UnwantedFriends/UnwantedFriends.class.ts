/* eslint-disable no-unused-vars */
import { Op } from '@sequelize/core';
import { Params, Id } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { BadRequest } from '@feathersjs/errors';
/** Local dependencies */
import { Application } from '../../declarations';
// eslint-disable-next-line import/prefer-default-export
export class FriendRequest extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  // async patch(id: Id, data, params: Params) {
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
  //         response = await this.app
  //           .service('friends')
  //           .create({ UserId: params.User.id, friendId: friendsRequestId });
  //         break;

  //       case false:
  //         response =
  //           'will be added to your undesired friends';
            
  //           /*await this.app
  //           .service('User_friends_undesired')
  //           .create({ UserId: params.User.id, friendId: friendsRequestId });*/
  //         break;

  //       default:
  //         throw new BadRequest('Parameters provided are not accepted');
  //     }
  //   } catch (err) {
  //     throw new BadRequest(err.message || `could not accept your request`);
  //   }

  //   return Promise.resolve({ response });
  // }
  // async remove(data, params: Params) {
  //   await this.app
  //     .get('sequelizeClient')
  //     .models.User_friends_request.destroy({ where: { ...params.query } });
  //   return Promise.resolve({ ...params.query });
  // }
}
