import routesPath from "./routesPath";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ResetPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPasswordSuccess from "./pages/ResetPassword/ForgotPasswordSuccess";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import Blog from "./pages/Blog/Blog";
import ViewBlog from "./pages/Blog/ViewBlog";
import AddBlog from "./pages/Blog/AddBlog";
import ViewPost from "./pages/NewsFeed/ViewPost";
import Profil from "./pages/Profil/Profil";
import EditProfile from "./pages/Profil/EditProfile";
import Message from "./pages/Message/Message";
import Member from "./pages/Member/Member";
import AddCommunity from "./pages/Community/AddCommunity";
import { Step, StepTwo, StepThree, StepFour } from "./pages/Profil/Steps";

//define access roles
let role = {
  PUBLIC: "public",
  USER: "user",
  AUTH: "auth",
};

//Define all routes on the app
let routes = [
  {
    path: routesPath.LOGIN,
    name: "Login",
    element: Login,
    access: role.PUBLIC,
  },
  {
    path: routesPath.REGISTER,
    name: "Register",
    element: Register,
    access: role.PUBLIC,
  },
  {
    path: routesPath.RESET_PASSWORD,
    name: "Reset Password",
    element: ResetPassword,
    access: role.PUBLIC,
  },
  {
    path: routesPath.FORGOT_PASSWORD_SUCCESS,
    name: "Forgot Password Success",
    element: ForgotPasswordSuccess,
    access: role.PUBLIC,
  },
  {
    path: routesPath.FORGOT_PASSWORD,
    name: "Forgot Password",
    element: ForgotPassword,
    access: role.PUBLIC,
  },
  {
    path: routesPath.VERIFY_EMAIL,
    name: "Verified Email",
    element: VerifyEmail,
    access: role.AUTH,
  },
  {
    path: routesPath.NEWSFEED,
    name: "News Feed",
    element: NewsFeed,
    access: role.USER,
  },
  {
    path: routesPath.BLOG,
    name: "Blog",
    element: Blog,
    access: role.USER,
  },
  {
    path: routesPath.VIEW_BLOG,
    name: "View blog",
    element: ViewBlog,
    access: role.USER,
  },
  {
    path: routesPath.ADD_BLOG,
    name: "Add Blog",
    element: AddBlog,
    access: role.USER,
  },
  {
    path: routesPath.PROFILE,
    name: "Profile",
    element: Profil,
    access: role.USER,
  },

  {
    path: routesPath.PROFILE_EDIT,
    name: "Edit Profile",
    element: EditProfile,
    access: role.USER,
  },

  {
    path: routesPath.MESSAGE,
    name: "Message",
    element: Message,
    access: role.USER,
  },
  {
    path: routesPath.POST,
    name: "Post",
    element: ViewPost,
    access: role.USER,
  },
  {
    path: routesPath.MEMBERS,
    name: "Member",
    element: Member,
    access: role.USER,
  },
  {
    path: routesPath.ADD_GROUPS,
    name: "Add Community",
    element: AddCommunity,
    access: role.USER,
  },
  {
    path: routesPath.STEP_ONE,
    name: "Step one",
    element: Step,
    access: role.PUBLIC,
  },
  {
    path: routesPath.STEP_TWO,
    name: "Step two",
    element: StepTwo,
    access: role.AUTH,
  },
  {
    path: routesPath.STEP_THREE,
    name: "Step three",
    element: StepThree,
    access: role.AUTH,
  },
  {
    path: routesPath.STEP_FOUR,
    name: "Step four",
    element: StepFour,
    access: role.AUTH,
  },
];
export { routes, role };
