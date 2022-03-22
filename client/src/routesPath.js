//Define all path routes

let routesPath = {
  NOTFOUND: "*",
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  FORGOT_PASSWORD_SUCCESS: "/forgot-password-success",
  VERIFY_EMAIL: "/verify-email/:id/:activationKey",
  RESET_PASSWORD: "/reset-password/:idUser/:resetPasswordKey",
  NEWSFEED: "/",
  STEP_ONE: "profile/step-one",
  STEP_TWO: "profile/step-two",
  STEP_THREE: "profile/step-three",
  STEP_FOUR: "profile/step-four",
  ALBUMS: "/albums",
  SAVED_POST: "/bookmarks",
  INTEREST: "/interest",
  FORUMS: "/forums",
  MY_INTERESTS: "/myinterest",
  MY_GROUPS: "/mygroups",
  MY_PAGES: "/mypages",
  PROFILE: "/profile/:id",
  PROFILE_EDIT: "me/profile/edit",
  FRIENDS: "/friends",
  FRIENDS_REQUESTS: "/friends/requests",
  PRIVACY_SETTINGS: "/privacy-settings",
  GENERAL_SETTINGS: "/general-settings",
};

export default routesPath;
