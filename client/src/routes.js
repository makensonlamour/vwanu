import routesPath from "./routesPath";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Home from "./pages/Home/index";
import { Step, StepTwo, StepThree, StepFour } from "./pages/Profil/Steps";

//define access roles
let role = {
  PUBLIC: "public",
  USER: "user",
  AUTH: "auth"
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
    access: role.PUBLIC
  },
  {
    path: routesPath.STEP_TWO,
    name: "Step two",
    element: StepTwo,
    access: role.AUTH
  },
  {
    path: routesPath.STEP_THREE,
    name: "Step three",
    element: StepThree,
    access: role.AUTH
  },
  {
    path: routesPath.STEP_FOUR,
    name: "Step four",
    element: StepFour,
    access: role.AUTH
  }
];
export { routes, role };
