import { z, object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'You must provide a valid email address',
    }).email('not a valid email'),
    password: string({
      required_error: 'You must provide a valid password',
    }),
  }),
})

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: string(),
  activationKey: z.string(),
  resetPasswordKey: string(),
  verified: z.boolean(),
})

export const verifyUserSchema = object({
  params: object({
    id: string(),
    activationKey: string(),
  }),
})

export const getUserSchema = object({
  params: object({
    id: string(),
  }),
})

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
})

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
})
export type UserInterface = z.infer<typeof UserSchema>
export type GetUserInput = z.infer<typeof getUserSchema>['params']
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>
export type CreateUserInput = TypeOf<typeof createUserSchema>['body']
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params']
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body']
