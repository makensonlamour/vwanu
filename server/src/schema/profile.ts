import { z, object, number, string, TypeOf } from 'zod';

export const ProfileSchema = object({
  id: z.number(),
  profilePicture: z.string(),
  coverPicture: z.string(),
  followers: z.string(),
  followings: z.string(),
  lastName: string(),
  firstName: string(),
  dob: z.date(),
});

export const createProfileSchema = object({
  body: object({
    userId: number({
      required_error: 'You must provide a valid user id',
    }),
    lastName: string({
      required_error: 'Your last name is required to create a profile',
    }),
    firstName: string({
      required_error: 'Your first name is required to create a profile',
    }),
    dob: z.string({
      required_error: 'Your date of birth is required to create a profile',
    }),
  }),
  params: object({
    files: z.object({}).optional(),
  }),
});

export type CreateProfileInput = TypeOf<typeof createProfileSchema>;
export type ProfileInterface = z.infer<typeof ProfileSchema>;
