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

/** some comments */

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
      invalid_type_error: "You' have not provided a recognizable text",
    }).min(1),
  }),
});

export const getOnePostSchema = object({
  params: object({
    id: z
      .number({ required_error: 'Please provide an id' })
      .or(z.string().regex(/\d+/).transform(Number)),
  }),
});

export const editPostSchema = object({
  params: object({
    id: z
      .number({ required_error: 'Please provide an id' })
      .or(z.string().regex(/\d+/).transform(Number)),
  }),
  body: object({
    media: string().optional(),
    mediaType: string().optional(),
    hashTag: string().optional(),
    private: z.boolean().optional(),
    postText: string({
      required_error: 'A post need at least to have some text',
      invalid_type_error: "You' have not provided a recognizable text",
    })
      .min(1)
      .optional(),
  }),
});
export const createCommentSchema = object({
  body: object({
    media: string().optional(),
    mediaType: string().optional(),
    hashTag: string().optional(),
    private: z.boolean().optional(),

    PostId: z
      .number({
        required_error: 'You need a post to create a comment',
      })
      .or(z.string().regex(/\d+/).transform(Number)),
    UserId: z
      .number({
        required_error: 'You cannot create a post if you are not a user',
      })
      .or(z.string().regex(/\d+/).transform(Number)),
    postText: string({
      required_error: 'A post need at least to have some text',
      invalid_type_error: "You' have not provided a recognizeable text",
    }).min(1),
  }),
});

export const editCommentSchema = object({
  params: object({
    id: z
      .number({ required_error: 'Please provide an id' })
      .or(z.string().regex(/\d+/).transform(Number)),
  }),
  body: object({
    media: string().optional(),
    mediaType: string().optional(),
    hashTag: string().optional(),
    private: z.boolean().optional(),
    postText: string({
      required_error: 'A post need at least to have some text',
      invalid_type_error: "You' have not provided a recognizable text",
    }).min(1),
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
const acceptableQueriesParameter = ['UserId', 'PostId'];
export const getAllComment = object({
  query: object({
    UserId: z
      .number({
        required_error: 'You cannot create a post if you are not a user',
        invalid_type_error: 'It must be a number',
      })
      .or(z.string().regex(/\d+/).transform(Number))
      .optional(),

    PostId: z
      .number({
        required_error: 'You cannot create a post if you are not a user',
        invalid_type_error: 'It must be a number',
      })
      .or(z.string().regex(/\d+/).transform(Number))
      .optional(),
  }).refine(
    (data) =>
      acceptableQueriesParameter.some((item) => {
        if (
          data[item] !== null &&
          data[item] !== undefined &&
          data[item] !== ''
        )
          return true;
        return false;
      }),

    {
      message: `Please pass at least either ${acceptableQueriesParameter.join(
        ' or '
      )}`,
    }
  ),
});

export type PostInterface = z.infer<typeof PostSchema>;
export type CreatePostInterface = z.infer<typeof createPostSchema>;
export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
export type CreateCommentInput = TypeOf<typeof createCommentSchema>['body'];
export type editCommentInput = TypeOf<typeof editCommentSchema>;
export type editPostInput = TypeOf<typeof editPostSchema>;
export type getOnePostInput = TypeOf<typeof getOnePostSchema>['params'];
