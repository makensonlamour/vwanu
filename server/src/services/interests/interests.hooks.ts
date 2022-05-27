import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';

/** Local dependencies */
import allowAnonymous from '../../Hooks/AllowAnonymous';
/** Global dependencies */
const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [allowAnonymous()],
    find: [
      authenticate('jwt', 'anonymous'),
      (context) => {
        if (!context.params.User?.admin) context.params.query.approved = true;
        return context;
      },
    ],
    get: [],
    create: [
      authenticate('jwt', 'anonymous'),
      (context) => {
        const { data, params } = context;
        const { User } = params;

        data.approved = User.admin;
      },
    ],
    update: [authenticate('jwt')],
    patch: [
      authenticate('jwt'),
      async (context) => {
        if (!context.params.User.admin)
          throw new BadRequest('You are not authorized to modify interest');
        if (context.params.User.admin) {
          const { approved } = await context.app
            .service(context.path)
            .get(context.id);
          if (approved)
            throw new BadRequest('Approved interest cannot be modified');
        }
        return context;
      },
    ],
    remove: [
      authenticate('jwt'),
      async (context) => {
        if (!context.params.User.admin)
          throw new BadRequest('You are not authorized to delete interest');
        if (context.params.User.admin) {
          const { approved } = await context.app
            .service(context.path)
            .get(context.id);
          if (approved)
            throw new BadRequest('Approved interest cannot be deleted');
        }
        return context;
      },
    ],
  },

  after: {
    all: [],
    find: [],
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
