import commonHooks from 'feathers-hooks-common';
import * as local from '@feathersjs/authentication-local';
// import authMan from 'feathers-authentication-management';
import * as feathersAuthentication from '@feathersjs/authentication';

import * as schema from '../../schema/user';
import isSelf from '../../Hooks/isSelf.hook';
import AutoLogin from '../../Hooks/AutoLoginHooks';
import validateResource from '../../middleware/validateResource';
import filesToBody from '../../middleware/PassFilesToFeathers/feathers-to-data.middleware';
import MediaStringToMediaObject from '../../Hooks/ProfileCoverToObject';
import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';
// const verifyHooks = authMan.hooks;

const { hashPassword, protect } = local.hooks;
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      validateResource(schema.createUserSchema),
      saveProfilePicture(['profilePicture', 'coverPicture']),
      filesToBody,
      hashPassword('password'),
    ],
    update: [commonHooks.disallow('external')],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(
          true,
          ...[
            'email',
            'isVerified',
            'verifyToken',
            'verifyShortToken',
            'verifyExpires',
            'verifyChanges',
            'resetToken',
            'resetShortToken',
            'resetExpires',
            'activationKey',
            'resetPasswordKey',
            'password',
          ]
        ),

        authenticate('jwt'),
        isSelf
      ),
      hashPassword('password'),
      saveProfilePicture(['profilePicture', 'coverPicture']),
    ],
    remove: [authenticate('jwt'), isSelf],
  },

  after: {
    all: [
      protect(
        ...[
          'password',
          'verifyToken',
          'resetToken',
          'resetShortToken',
          'resetExpires',
          'verifyShortToken',
          'activationKey',
          'resetPasswordKey',
          'verifyExpires',
        ]
      ),
      MediaStringToMediaObject(['profilePicture', 'coverPicture']),
    ],
    find: [],
    get: [
      async (context) => {
        if (
          !context.params.User ||
          !context.id ||
          context.params.User.id === context.id
        )
          return context;

        try {
          await context.app.service('userVisitor').create({
            UserId: context.id,
            VisitorId: context.params.User.id,
          });
        } catch (error) {
          console.log(error);
        }

        return context;
      },
    ],
    create: [AutoLogin],
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
