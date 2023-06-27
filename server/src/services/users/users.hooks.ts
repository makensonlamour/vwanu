import commonHooks from 'feathers-hooks-common';
import * as local from '@feathersjs/authentication-local';
import * as feathersAuthentication from '@feathersjs/authentication';

import * as schema from '../../schema/user';
import isSelf from '../../Hooks/isSelf.hook';
import AutoLogin from '../../Hooks/AutoLoginHooks';
import validateResource from '../../middleware/validateResource';
import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';
import MediaStringToMediaObject from '../../Hooks/ProfileCoverToObject';
import filesToBody from '../../middleware/PassFilesToFeathers/feathers-to-data.middleware';

import {
  SaveAddress,
  AddVisitor,
  GetUser,
  SendWelcomeMail /* SendEmail */,
} from './hook';
import SaveAndAttachInterests from '../../Hooks/SaveAndAttachInterest';

const { hashPassword, protect } = local.hooks;
const { authenticate } = feathersAuthentication.hooks;

const protectkeys = protect(
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
    'search_vector',
  ]
);
export default {
  before: {
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
    all: [MediaStringToMediaObject(['profilePicture', 'coverPicture'])],
    find: [protectkeys],
    get: [AddVisitor, protectkeys],
    create: [
      SaveAddress,
      AutoLogin,
      // IncludeAddress,
      SaveAndAttachInterests({
        entityName: 'User',
        relationTableName: 'User_Interest',
        foreignKey: 'UserId',
      }),
      SendWelcomeMail,
      protectkeys,
    ],
    patch: [
      SaveAddress,
      SaveAndAttachInterests({
        entityName: 'User',
        relationTableName: 'User_Interest',
        foreignKey: 'UserId',
      }),
      protectkeys,
    ],
    remove: [protectkeys],
  },
};
