import { Outlet, Navigate } from "react-router-dom";

//Core components
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import Container from "../../components/container/index";

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return (
    <>
      <Navbar />
      <Container />
      {isAuth ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default ProtectedRoutes;
