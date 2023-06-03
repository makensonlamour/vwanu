import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import includes from 'lodash/includes';

export default (context: HookContext): HookContext => {
  const { params, data } = context;
  const noVerify = [
    'checkUnique',
    'sendResetPwd',
    'passwordChange',
    'resendVerifySignup',
    'resetPwdLong',
  ];
  if (includes(noVerify, data.action)) return;

  if (!params.User)
    throw new BadRequest('Please authenticate to perform this action');
  const valid = includes(params.User, data.value);

  if (!valid) {
    console.log({ valid, data, u: params.User.id });
    throw new BadRequest('User values do not match expected values.');
  }

  // eslint-disable-next-line consistent-return
  return context;
};
