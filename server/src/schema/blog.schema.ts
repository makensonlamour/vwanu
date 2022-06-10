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
      .min(1),
    blogTitle: string({
      required_error: 'Please provide a title for your blog',
      invalid_type_error: "You' have not provided a recognizable text",
    }).min(1),

    coverPicture: string().optional(),
    publish: z.boolean().optional(),
  }),
});

const mustHaveEditBlog = ['blogText', 'blogTitle', 'coverPicture', 'publish'];
export const editBlogSchema = object({
  body: object({
    blogText: string().optional(),
    blogTitle: string().optional(),
    coverPicture: string().optional(),
    publish: z.boolean().optional(),
  }).refine(
    (data) =>
      mustHaveEditBlog.some((item) => {
        if (
          data[item] !== null &&
          data[item] !== undefined &&
          data[item] !== ''
        )
          return true;
        return false;
      }),

    {
      message: `Please provided either ${mustHaveEditBlog.join(
        ' or '
      )} to update`,
    }
  ),
});
