import env from "./config";
// components
import Home from "./views/Home/index";
import Login from "./views/Login/index";
import LayIndex from "./layouts/Auth";
const paths = env.endpoints;
const { layouts } = env;
var routes = [
  {
    path: paths.Home,
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    element: Home,
    layout: layouts.HOME,
  },

  {
    path: paths.LOGIN,
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    element: Login,
    layout: layouts.AUTH,
  },
  {
    path: paths.AuthIN,
    name: "Auth Set Up ",
    icon: "ni ni-tv-2 text-primary",
    element: LayIndex,
    layout: layouts.AUTH,
  },
  /*
  {
    path: paths.FORGOT_PASSWORD,
    name: "Forgot Password",
    icon: "ni ni-tv-2 text-primary",
    component: ForgotPassword,
    layout: layouts.AUTH,
  },
 
  {
    path: paths.RECOVER_PASSWORD,
    name: "Recover Password",
    icon: "ni ni-tv-2 text-primary",
    component: RecoverPassword,
    layout: layouts.AUTH,
  },

  {
    path: paths.USER_PROFILE,
    name: "Profile",
    icon: "fa fa-camera text-indigo",
    component: Profile,
    layout: layouts.ADMIN,
    NoList: true,
  },
  */
];
export default routes;
