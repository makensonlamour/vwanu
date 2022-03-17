import React, { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";
import { isExpired } from "../../helpers/index";

//core components
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import SidebarRight from "../../components/Sidebars/Right/index";
import routesPath from "../../routesPath";

const LayoutUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let currentUser = useAuth();

  const auth = currentUser;

  const loadUser = () => {
    if (auth?.data?.data) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    if (isExpired(token)) return dispatch(logout());
    return dispatch(setUser(token));
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="lg:flex lg:flex-row">
        <div className="hidden lg:inline lg:basis-[25%]">
          <SidebarLeft />
        </div>
        <div className="w-full lg:basis-[50%] lg:ml-28">
          {auth?.data?.data ? <Outlet /> : <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />}
        </div>
        <div className="hidden lg:block lg:basis-[25%]">
          <SidebarRight />
        </div>
      </div>
    </>
  );
};

export default LayoutUser;
