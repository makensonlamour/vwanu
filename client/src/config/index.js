const environment = {
  development: {
    BASE_URL: "http://localhost:4000",
    EXPECTED_HEADER: "x-auth-token",
    endpoints: {
      LOGIN: "/login",
      REGISTER: "/register",
      FORGOT_PASSWORD: "/forgotPassword",
      RECOVER_PASSWORD: "/recoverPassword",
      AuthIN: "/index",
    },
    layouts: {
      ADMIN: "/admin",
      AUTH: "/auth",
    },
    idsTypes: ["ID", "Passport", "License"],
  },
  staging: {
    BASE_URL: "YOUR_BASE_URL",
    endpoints: {
      LOGIN: "/login",
      REGISTER: "/register",
      FORGOT_PASSWORD: "/forgotPassword",
      RECOVER_PASSWORD: "/recoverPassword",
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
