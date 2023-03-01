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

export type CLOUDINARY_CONFIG_TYPE = z.infer<typeof CLOUDINARY_CONFIG_SCHEMA>;
