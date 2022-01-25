import { Outlet, Navigate } from "react-router-dom";

//Core components
import Container from "../../components/container/index";

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
