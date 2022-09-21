/* eslint-disable no-underscore-dangle */
import { HookContext } from '@feathersjs/feathers';
import { GeneralError } from '@feathersjs/errors';
import isNill from 'lodash/isNil';

export default async (context: HookContext) => {
  const { params, app } = context;

  const { User } = params;
  if (isNill(User))
    throw new Error('Only authenticated users can access this service.');
  try {
    const result = await app.service('conversation-users')._find({
      query: { UserId: User.id },
      paginate: false,
    });

    context.result = result;
  } catch (err) {
    throw new GeneralError(
      `We could not find your conversation due to ${err.message}`
    );
  }

  return context;
};
