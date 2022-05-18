import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';
// import { BadRequest } from '@feathersjs/errors';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [
      // async (context) => {
      //   const { params } = context;
      //   const { action } = context.params.query;
      //   delete params.query.action;
      //   if (!params.provider) return context;
      //   if (!action) throw new Error('please set an action');

      //   switch (action) {
      //     case 'people-who-want-to-Be-my-friend':
      //       params.query.$select = ['friendsRequestId'];
      //       params.query.UserId = params.User.id;
      //       break;

      //     case 'people-i-want-to-be-friend-with':
      //       params.query.friendsRequestId = params.User.id;
      //       params.query.$select = ['UserId'];
      //       break;
      //     default:
      //       throw new Error('This action is not supported');
      //   }
      //   return context;
      // },
    ],
    get: [],
    create: [
      // async (context) => {
      //   const { app, data, params } = context;

      //   // check to see if a friend request exist already
      //   const { Model } = app.service(context.path);
      //   const records = await Model.findOne({
      //     where: { UserId: data.UserId, friendsRequestId: params.User.id },
      //   });

      //   if (records) throw new BadRequest('You already have a friend request');

      //   // check if there is  previous unwanted request and
      //   const unWantedModel =
      //     app.get('sequelizeClient').models.User_friends_undesired;

      //   const rec = await unWantedModel.findOne({
      //     where: { UserId: data.UserId, undesiredFriendId: params.User.id },
      //   });

      //   if (rec) throw new BadRequest('Your fiendRequest was rejected ');

      //   data.friendsRequestId = params.User.id;

      //   return context;
      // },
    ],
    update: [disallow()],
    patch: [],
    remove: [
      // async (context) => {
      //   const { params } = context;
      //   params.query.friendsRequestId = params.User.id;
      //   return context;
      // },
    ],
  },

  after: {
    all: [],
    find: [
      // async (context) => {
      //   if (!context.params.provider) return context;
      //   const { app } = context;

      //   if (context.result.length < 1) return context;

      //   const key = Object.keys(context.result[0])[0];
      //   const data = context.result.map((req) => req[key]);
      //   const req = await app.service('users').find({
      //     query: {
      //       id: { $in: data },
      //       $select: ['firstName', 'lastName', 'id', 'profilePicture'],
      //     },
      //   });

      //   context.result = req.data;
      //   return context;
      // },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
