import { Outlet, Navigate } from "react-router-dom";
const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

const UnProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/home" /> : <Outlet />;
};

export default UnProtectedRoutes;
