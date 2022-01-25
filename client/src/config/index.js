const environment = {
  development: {
    BASE_URL: "http://localhost:4000/api",
    EXPECTED_HEADER: "x-auth-token",
    endpoints: {
      LOGIN: "/auth",
      REGISTER: "/user",
      FORGOT_PASSWORD: "/forgotPassword",
      RECOVER_PASSWORD: "/recoverPassword",
      AuthIN: "/index"
    },
    layouts: {
      ADMIN: "/admin",
      AUTH: "/auth"
    },
    path: {
      LOGIN: "/",
      REGISTER: "/register",
      FORGOT_PASSWORD: "/forgotPassword",
      RECOVER_PASSWORD: "/recoverPassword",
      HOME: "/home"
    },
    idsTypes: ["ID", "Passport", "License"]
  },
  staging: {
    BASE_URL: "YOUR_BASE_URL",
    endpoints: {
      LOGIN: "/auth",
      REGISTER: "/user",
      FORGOT_PASSWORD: "/forgotPassword",
      RECOVER_PASSWORD: "/recoverPassword",
      AuthIN: "/index"
    },
    layouts: {
      ADMIN: "/admin",
      AUTH: "/auth"
    },
    idsTypes: ["ID", "Passport", "License"]
  },
  production: {}
};
const getEnvironment = () => {
  return environment.development;
};

export default getEnvironment();
