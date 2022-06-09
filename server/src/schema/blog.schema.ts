import { z, object, string } from 'zod';

export const BlogSchema = z.object({
  id: string(),
  blogText: string(),
  blogTitle: string(),
  coverPicture: string(),
  publish: z.boolean(),
  slug: string(),
});

export const createBlogSchema = object({
  body: object({
    blogText: string({
      required_error: 'Please provide some for your blog',
      invalid_type_error: "You' have not provided a recognizable text",
    })
      .min(1)
      .optional(),
    blogTitle: string({
      required_error: 'Please provide a title for your blog',
      invalid_type_error: "You' have not provided a recognizable text",
    })
      .min(1)
      .optional(),
    coverPicture: string().optional(),
    publish: z.boolean().optional(),
  }),
});

export const editPostSchema = object({
  body: object({
    blogText: string().optional(),
    blogTitle: string().optional(),
    coverPicture: string().optional(),
    publish: z.boolean().optional(),
  }),
});
