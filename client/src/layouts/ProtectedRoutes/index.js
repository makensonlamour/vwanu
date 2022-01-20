import { Outlet, Navigate } from "react-router-dom";

//Core components
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return (
    <>
      <Navbar />
      {isAuth ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default ProtectedRoutes;
