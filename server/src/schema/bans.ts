import { z, object, string } from 'zod';


// eslint-disable-next-line import/prefer-default-export
export const createBanSchema = object({
  body: object({
    userId: string({
      required_error: 'You have not provided the user id',
      invalid_type_error: 'It must be a valid user id',
    }),
    communityId: string({
      required_error: 'You have not provided the community id',
      invalid_type_error: 'It must be a valid community id',
    }),
    comment: string().optional(),
    until: z.date().optional(),
  }),
});
