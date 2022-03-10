import { z, object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    first_name:string({
      required_error:'Please provide a first name'
    }),
    last_name:string({
      required_error:'Please provide a last name'
    }),
    email: string({
      required_error: 'You must provide a valid email address',
    }).email('The email address you provided is not a valid email'),
    password: string({
      required_error: 'You must provide a valid password',
    }).min(6, 'Password is too short - should be min 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});



export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: string(),
  activationKey: z.string(),
  resetPasswordKey: string(),
  verified: z.boolean(),
});

export const UpUser = object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  password: string(),
  first_name: string(),
  last_name: string(),
  avatar: string(),
  cover: string(),
  background_image: string(),
  background_image_status: z.boolean(),
  relationship_id: z.number(),
  address: string(),
  activationKey: z.string(),
  resetPasswordKey: string(),
  working: string(),
  working_link: string(),
  about: string(),
  school: string(),
  gender: string(),
  birthday: string(),
  country_id: string(),
  website: string(),
  facebook: string(),
  google: string(),
  twitter: string(),
  linkedin: string(),
  youtube: string(),
  vk: string(),
  instagram: string(),
  qq: string(),
  wechat: string(),
  discord: string(),
  mailru: string(),
  language: string(),
  email_code: string(),
  src: string(),
  ip_address: string(),
  follow_privacy: z.boolean(),
  friend_privacy: z.boolean(),
  post_privacy: string(), // enum , I_follow , none, everyone
  message_privacy: z.string(), // enum , I_follow , none, everyone
  confirm_followers: z.boolean(),
  show_activities_privacy: z.boolean(),
  birth_privacy: z.boolean(),
  visit_privacy: z.boolean(),
  verified: z.boolean(),
  last_seen: z.boolean(),
  show_last_seen: z.boolean(),
  emailNotification: z.boolean(),
  e_liked_notified: z.boolean(),
  e_shared_notified: z.boolean(),
  e_commented_notified: z.boolean(),
  e_followed_notified: z.boolean(),
  e_accepted_notified: z.boolean(),
  e_mentioned_notified: z.boolean(),
  e_joined_group_notified: z.boolean(),
  e_liked_page_notified: z.boolean(),
  e_visited_notified: z.boolean(),
  e_profile_wall_post_notified: z.boolean(),
  e_memory_notified: z.boolean(),
  status: string(),
  active: z.boolean(),
  admin: z.boolean(),
  type: string(),
  registered: string(),
  startup_image: z.boolean(),
  last_email_sent: z.number(),
  phone_number: string(),
  sms_code: string(),
  is_pro: z.boolean(),
  pro_time: z.number(),
  pro_type: z.string(), // enum
  joined: z.number(),
  css_file: z.string(),
  timezone: z.string(),
  referrer: z.number(), // id of the referrer
  ref_user_id: z.number(), // id of the referrer
  balance: string(),
  paypal_email: string(),
  notifications_sound: z.boolean(),
  order_posts_by: z.boolean(),
  social_login: z.boolean(),
  android_m_device_id: string(),
  ios_m_device_id: string(),
  android_n_device_id: string(),
  ios_n_device_id: string(),
  web_device_id: string(),
  lat: string(),
  lng: string(),
  last_location_update: string(),
  post_count: z.number(),
  album_count: z.number(),
  following_count: z.number(),
  followers_count: z.number(),
  groups_count: z.number(),
  likes_count: z.number(),
  sidebar_data: string(),
  last_avatar_mod: z.number(),
  last_cover_mod: z.number(),
  points: z.number(),
  daily_points: z.number(),
  point_day_expire: z.number(),
  last_follow_id: z.number(),
  last_login_data: string(),
  two_factor: z.number(),
  new_email: string(),
  two_factor_verified: z.boolean(),
  new_phone: z.string(),
  city: string(),
  state: string(),
  zip: string(),
  school_completed: string(),
  weather_unit: string(),
  StripeSessionId: string(),
});
export const verifyUserSchema = object({
  params: object({
    id: string(),
    activationKey: string(),
  }),
});

export const getUserSchema = object({
  params: object({
    id: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

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
});
export type UserInterface = z.infer<typeof UserSchema>;
export type GetUserInput = z.infer<typeof getUserSchema>['params'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
