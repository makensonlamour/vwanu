import { z, object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'Please provide a first name',
    }),
    lastName: string({
      required_error: 'Please provide a last name',
    }),
    email: string({
      required_error: 'You must provide a valid email address',
    }).email('The email address you provided is not a valid email'),
    password: string({
      required_error: 'You must provide a valid password',
    }).min(6, 'Password is too short - should be min 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: string(),
  activationKey: z.string(),
  resetPasswordKey: string(),
  verified: z.boolean(),
});

export const socialMediaSchema = object({
  facebook: string(),
  google: string(),
  twitter: string(),
  linkedin: string(),
  youtube: string(),
  tiktok: string(),
  vk: string(),
  instagram: string(),
  qq: string(),
  wechat: string(),
  discord: string(),
});


export const account = object({
  id: z.string(),
  access_role: z.string(),
  approved_status: z.boolean(),
  active_status: z.boolean(),
  email_activation_key: z.string(),
  email: z.string(),
  password: string(),
  firstName: string(),
  lastName: string(),
  profilePicture: string(),
  coverPicture: string(),
  backgroundImage: string(),
  resetPasswordKey: string(),
  about: string(),
  gender: string(),
  birthday: string(),
  website: string(),
  resetExpires: z.date(),
  resetAttempts: z.number(),
  resetShortPasswordKey: z.string(),
  search_vector: z.string(),
});
export const addOrRemoveFriendSchema = object({
  params: object({
    id: string(),
    friendId: string(),
  }),
  query: object({
    action: string(),
  }),
});
export const verifyUserSchema = object({
  params: object({
    id: string(),
    activationKey: string(),
  }),
});

export const getUserSchema = object({
  params: object({
    id: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    resetPasswordKey: string(),
  }),
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too short - should be min 6 chars'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});
export type UserInterface = z.infer<typeof UserSchema>;
export type UpUserInterface = z.infer<typeof account>;
export type GetUserInput = z.infer<typeof getUserSchema>['params'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type addOrRemoveFriendInput = TypeOf<typeof addOrRemoveFriendSchema>;
