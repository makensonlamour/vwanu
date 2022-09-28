import commonHooks from 'feathers-hooks-common';
import * as local from '@feathersjs/authentication-local';
// import authMan from 'feathers-authentication-management';
import * as feathersAuthentication from '@feathersjs/authentication';

import * as schema from '../../schema/user';
import isSelf from '../../Hooks/isSelf.hook';
import AutoLogin from '../../Hooks/AutoLoginHooks';
import validateResource from '../../middleware/validateResource';
import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';
import MediaStringToMediaObject from '../../Hooks/ProfileCoverToObject';
import filesToBody from '../../middleware/PassFilesToFeathers/feathers-to-data.middleware';
// const verifyHooks = authMan.hooks;
import { SaveAddress, IncludeAddress, AddVisitor, GetUser } from './hook';
import SaveAndAttachInterests from '../../Hooks/SaveAndAttachInterest';
// import { IncludeAssociations } from '../../Hooks';

const { hashPassword, protect } = local.hooks;
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [],
    find: [authenticate('jwt'), GetUser],
    get: [authenticate('jwt'), GetUser],
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
    get: [IncludeAddress, AddVisitor],
    create: [
      SaveAddress,
      AutoLogin,
      IncludeAddress,
      SaveAndAttachInterests({
        entityName: 'User',
        relationTableName: 'User_Interest',
        foreignKey: 'UserId',
      }),
    ],
    update: [],
    patch: [
      SaveAddress,
      IncludeAddress,
      SaveAndAttachInterests({
        entityName: 'User',
        relationTableName: 'User_Interest',
        foreignKey: 'UserId',
      }),
    ],
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
