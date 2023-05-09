import { z, number, object } from 'zod';

export const API_CONFIG_SCHEMA = object({
  port: number({
    invalid_type_error: 'Port must be a number',
    required_error: 'Port is required for server to run',
  }).or(z.string().regex(/\d+/).transform(Number)),
  host: z.string({
    required_error: 'Host is required for server to run',
  }),
});

export type ApiConfigurationType = z.infer<typeof API_CONFIG_SCHEMA>;
