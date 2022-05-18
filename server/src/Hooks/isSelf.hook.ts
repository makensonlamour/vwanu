import { BadRequest } from '@feathersjs/errors';

export default (context) => {
  if (context.id.toString() !== context.params.User.id.toString())
    throw new BadRequest('Invalid Parameters', {
      message: 'You are not authorized to modify other users',
    });
  return context;
};
