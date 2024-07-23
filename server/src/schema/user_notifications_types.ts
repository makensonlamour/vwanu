import { z, object, string, TypeOf } from 'zod';

const validNotificationsSlugs = [
  'new_chat',
  'new_notification',
  'new_friend',
  'new_like',
  'new_comment',
  'new_follow',
  'new_comment_like',
  'new_comment_reply',
  'new_friend_request',
  'new_post_mention',
  'new_community_invitation',
  'new_blog_response',
];

export const createUsernotificationTypesSchema = object({
  body: object({
    notification_slug: string({
      required_error: 'Please provide notification slug',
      invalid_type_error: 'Invalid notification slug',
    }),
    user_id: string({
      required_error: 'Please provide notification name',
      invalid_type_error: 'Invalid notification name',
    }),
    text: z.boolean({
      required_error: 'Please provide notification text',
      invalid_type_error: 'Invalid notification text',
    }),
    email: z.boolean(
      {
        required_error: 'Please provide notification email',
        invalid_type_error: 'Invalid notification email',
      }
    ),
    sound: z.boolean((
      {
        required_error: 'Please provide notification sound',
        invalid_type_error: 'Invalid notification sound',
      }
    )),
  }).refine(
    (data) => validNotificationsSlugs.includes(data.notification_slug),
    {
      message: 'Invalid notification type slug',
      path: ['notification_name'],
    }
  ),
});

export const userNotificationTypesSchema = object({
  notification_slug: string({
    required_error: 'Please provide notification slug',
    invalid_type_error: 'Invalid notification slug',
  }),
  user_id: string({
    required_error: 'Please provide notification name',
    invalid_type_error: 'Invalid notification name',
  }),

  text: z.boolean(),
  email: z.boolean(),
  sound: z.boolean(),

});

/**
 * Represents the inferred type of the `notificationSettingsSchema`.
 * This type defines the structure of the notification settings.
 */
export type UserNotificationTypesInterface = z.infer<
  typeof userNotificationTypesSchema
>;
export type CreateNotificationTypesInput = TypeOf<
  typeof createUsernotificationTypesSchema
>;
