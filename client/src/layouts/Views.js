import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../views/Login/index";
import Register from "../views/Register/index";
import Home from "../views/Home/index";
import ProtectRoutes from "../layouts/ProtectedRoutes/index";
import Error404 from "../views/ErrorPage/index";

const useAuth = () => {
  const user = { loggedIn: true };
  return user && user.loggedIn;
};
const Views = () => {
  const isAuth = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />) : (
      <Route element={<ProtectRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Views;
