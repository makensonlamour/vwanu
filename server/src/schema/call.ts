import { z, number, object, string } from 'zod';

export const Call = z.object({
  id: string(),
  startTime: number(),
  endTime: number(),
  status: string(),
  type: string(),
});
export const CallStatus = [
  'initiated',
  'answered',
  'denied',
  'canceled',
  'ended',
  'connected',
];

export type CallInterface = z.infer<typeof Call>;

export const createCallSchema = object({
  body: object({
    receiverId: number().or(string()),
    type: z.enum(['video', 'audio']),
  }),
});
