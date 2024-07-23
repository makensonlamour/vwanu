import * as authentication from '@feathersjs/authentication';
import { HookContext } from '@feathersjs/feathers';
// Don't remove this comment. It's needed to format import lines nicely.
import addAssociation from '../../Hooks/AddAssociations';
import AgeAllow from '../../Hooks/AgeAllow';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), AgeAllow],
    find: [
      addAssociation({
        models: [
          {
            model: 'users',
            attributes: [
              'firstName',
              'lastName',
              'id',
              'profilePicture',
              'createdAt',
            ],
          },
        ],
      }),
    ],
    get: [],
    create: [async (context: HookContext) => {
      const { data, app } = context;
      const sequelizeClient = app.get('sequelizeClient');
      const { notificationType } = data;
      const dat = (await sequelizeClient.models.UserNotificationTypes.findOne({ where: { user_id: data.to, notification_slug: notificationType } }));
      context.data.sound = dat?.sound || false;
      return context;
    }],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],// check the user setting and determing if text or email should be sent
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
