import routesPath from "./routesPath";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Home from "./pages/Home/index";
import { Step } from "./pages/Profil/Steps";

//define access roles
let role = {
  PUBLIC: "public",
  USER: "user"
};

//Define all routes on the app
let routes = [
  {
    path: routesPath.LOGIN,
    name: "Login",
    element: Login,
    access: role.PUBLIC
  },
  {
    path: routesPath.REGISTER,
    name: "Register",
    element: Register,
    access: role.PUBLIC
  },
  {
    path: routesPath.NEWSFEED,
    name: "News Feed",
    element: Home,
    access: role.USER
  },
  {
    path: routesPath.STEP_ONE,
    name: "Step one",
    element: Step,
    access: role.USER
  },
  {
    path: routesPath.STEP_TWO,
    name: "Step two",
    element: Step,
    access: role.USER
  },
  {
    path: routesPath.STEP_THREE,
    name: "Step three",
    element: Step,
    access: role.USER
  },
  {
    path: routesPath.STEP_FOUR,
    name: "Step four",
    element: Step,
    access: role.USER
  }
];
export { routes, role };
