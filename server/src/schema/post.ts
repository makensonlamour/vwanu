import { z, object, string, TypeOf } from 'zod';

const mustHave = ['UserId', 'GroupId'];
export const PostSchema = z.object({
  id: z.number(),
  media: z.string(),
  mediaType: string(),
  postText: z.string(),
  hashTag: string(),
  private: z.boolean(),
});

export const createPostSchema = object({
  body: object({
    media: string().optional(),
    mediaType: string().optional(),
    hashTag: string().optional(),
    private: z.boolean().optional(),

    UserId: z.number({
      required_error: 'You cannot create a post if you are not a user',
    }),
    postText: string({
      required_error: 'A post need at least to have some text',
    }),
  }),
});

export const getAllPost = object({
  query: object({
    UserId: z
      .number({
        required_error: 'You cannot create a post if you are not a user',
        invalid_type_error: 'It must be a number',
      })
      .or(z.string().regex(/\d+/).transform(Number))
      .optional(),

    GroupId: z
      .number({
        required_error: 'You cannot create a post if you are not a user',
        invalid_type_error: 'It must be a number',
      })
      .or(z.string().regex(/\d+/).transform(Number))
      .optional(),
  }).refine(
    (data) =>
      mustHave.some((item) => {
        if (
          data[item] !== null &&
          data[item] !== undefined &&
          data[item] !== ''
        )
          return true;
        return false;
      }),

    {
      message: `Please pass at least either ${mustHave.join(' or ')}`,
    }
  ),
});

export type PostInterface = z.infer<typeof PostSchema>;
// export type UpUserInterface = z.infer<typeof UpUser>;
// export type GetUserInput = z.infer<typeof getUserSchema>['params'];
// export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type CreatePostInterface = z.infer<typeof createPostSchema>;
export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
// export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
// export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
