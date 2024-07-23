import { object, string } from 'zod';

const createCommunityJoinSchema = object({
  body: object({
    CommunityId: string({
      invalid_type_error: 'Please provide a valid community id',
      required_error: 'You need to provide a community id',
    }),
  }),
});

export default createCommunityJoinSchema;
