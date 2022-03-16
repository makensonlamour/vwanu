const environment = {
  development: {
    BASE_URL: "http://localhost:4000/api",
    EXPECTED_HEADER: "x-auth-token",
    endpoints: {
      LOGIN: "/auth",
      REGISTER: "/user",
      FORGOT_PASSWORD: "user/forgotPassword",
      RESET_PASSWORD: "user/resetPassword",
      AuthIN: "/index",
    },
    layouts: {
      ADMIN: "/admin",
      AUTH: "/auth",
    },
    idsTypes: ["ID", "Passport", "License"],
  },
  staging: {
    BASE_URL: process.env.REACT_APP_API_URL,
    endpoints: {
      LOGIN: "/auth",
      REGISTER: "/user",
      FORGOT_PASSWORD: "/forgotPassword",
      RECOVER_PASSWORD: "/recoverPassword",
      VERIFIED_EMAIL: "/verifiedEmail",
      AuthIN: "/index",
    },
    layouts: {
      ADMIN: "/admin",
      AUTH: "/auth",
    },
    idsTypes: ["ID", "Passport", "License"],
  },
  production: {},
};
const getEnvironment = () => {
  return environment.development;
};

export default getEnvironment();
