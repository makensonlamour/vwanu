import isNill from 'lodash/isNil';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext) => {
  const { data, path, app } = context;
  if (isNill(data.CommunityId)) return context;

  const modelName = app.services[path].Model.name;
  const community = await app
    .service('communities')
    .get(data.CommunityId, { User: context.params.User });

  switch (modelName) {
    case 'Post':
      if (!community.canUserPost)
        throw new BadRequest('You can not post in this community');
      break;

    case 'Discussion':
      if (!community.haveDiscussionForum || !community.canMessageUserInGroup)
        throw new BadRequest(
          'You can not create a forum or add discussion in this community'
        );
      break;

    default:
      throw new Error('Invalid service');
  }

  return context;
};
