import { HookContext } from '@feathersjs/feathers';
import { GeneralError } from '@feathersjs/errors';

import isNill from 'lodash/isNil';

export default async (context: HookContext) => {
  const { params, app } = context;

  const { User } = params;
  if (isNill(User))
    throw new Error('Only authenticated users can access this service.');

  try {
    const result = await app.service('conversation-users').find({
      query: { UserId: User.id },
    });

    context.result = result;
  } catch (err) {
    console.log(err)
    throw new GeneralError(
      `We could not find your conversation due to ${err.message}`
    );
  }

  return context;
};
