import { z, object } from 'zod';

export const CLOUDINARY_CONFIG_SCHEMA = object({
  api_secret: z.string({
    required_error: 'Cloudinary API secret is required',
    invalid_type_error: 'Cloudinary API secret must be a string',
  }),
  api_key: z.string({
    required_error: 'Cloudinary API key is required',
    invalid_type_error: 'Cloudinary API key must be a string',
  }),
  cloud_name: z.string({
    required_error: 'Cloudinary cloud name is required',
    invalid_type_error: 'Cloudinary cloud name must be a string',
  }),
});

export const MEDIA_CONFIG_SCHEMA = object({
  maxPostVideos: z
    .number({
      required_error: 'Please provide a valid number for max Post Videos ',
    })
    .or(z.string().regex(/\d+/).transform(Number)),
  maxPostAudios: z
    .number({
      required_error: 'Please provide a valid number for max Post Audios ',
    })
    .or(z.string().regex(/\d+/).transform(Number)),
  maxPostImages: z
    .number({
      required_error: 'Please provide a valid number for max Post Images ',
    })
    .or(z.string().regex(/\d+/).transform(Number)),
  maxMessageImages: z
    .number({
      required_error: 'Please provide a valid number for max Message Images ',
    })
    .or(z.string().regex(/\d+/).transform(Number)),
  maxDiscussionVideos: z
    .number({
      required_error:
        'Please provide a valid number for max Discussion Videos ',
    })
    .or(z.string().regex(/\d+/).transform(Number)),
  maxDiscussionAudios: z
    .number({
      required_error:
        'Please provide a valid number for max Discussion Audios ',
    })
    .or(z.string().regex(/\d+/).transform(Number)),
  maxDiscussionImages: z
    .number({
      required_error:
        'Please provide a valid number for max Discussion Images ',
    })
    .or(z.string().regex(/\d+/).transform(Number)),
});

export type MEDIA_CONFIG_TYPE = z.infer<typeof MEDIA_CONFIG_SCHEMA>;
export type CLOUDINARY_CONFIG_TYPE = z.infer<typeof CLOUDINARY_CONFIG_SCHEMA>;
