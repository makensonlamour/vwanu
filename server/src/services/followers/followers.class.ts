/* eslint-disable no-unused-vars */
import { Op } from '@sequelize/core';
import { Params, Id } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';

import { BadRequest } from '@feathersjs/errors';

/** Local dependencies */
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class Followers extends Service {
  app;

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async find(params: Params) {
    if (!params.provider) return super.create(params);

    let response = [];
    const UserModel = this.app.service('users').Model;
    const { action } = params.query;
    const requesterId = params.User.id;
    let requester;

    switch (action) {
      case 'people-who-follow-me':
        requester = await UserModel.findOne({
          where: { id: requesterId },

          include: [
            {
              model: UserModel,
              as: 'Follower',
              attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
            },
          ],
        });

        if (!requester) throw new BadRequest('Could not find your profile');
        response = requester.Follower;
        break;

      case 'people-i-follow':
        requester = await UserModel.findOne({
          where: { id: requesterId },

          include: [
            {
              model: UserModel,
              as: 'Following',
              attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
            },
          ],
        });

        if (!requester) throw new BadRequest('Could not find your profile');
        response = requester.Following;

        break;
      default:
        throw new BadRequest('This action is not supported');
    }
    return Promise.resolve(response);
  }

  async remove(data, params: Params) {
    const res = await this.app
      .get('sequelizeClient')
      .models.User_Follower.destroy({
        where: { UserId: params.query.UserId, FollowerId: params.User.id },
      });
        
    return Promise.resolve(res);
  }
}
