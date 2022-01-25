import env from "./config";
// components
import Home from "./views/Home/index";
import Login from "./views/Login/index";
import LayIndex from "./layouts/Auth";
const paths = env.routes.path;
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
];
export default routes;
