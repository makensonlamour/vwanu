import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, setUser, logout } from "../../store/auth";
import { isExpired } from "../../helpers/index";

//core components
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import SidebarRight from "../../components/Sidebars/Right/index";
import routesPath from "../../routesPath";

const LayoutUser = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);

  const auth = currentUser;

  const loadUser = () => {
    if (auth?.token) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    if (isExpired(token)) return dispatch(logout());
    return dispatch(setUser(token));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="lg:flex lg:flex-row">
        <div className="hidden lg:inline lg:basis-[25%]">
          <SidebarLeft />
        </div>
        <div className="w-full lg:basis-[50%] lg:ml-28">{auth?.token ? <Outlet /> : <Navigate to={routesPath.LOGIN} />}</div>
        <div className="hidden lg:block lg:basis-[25%]">
          <SidebarRight />
        </div>
      </div>
    </>
  );
};

export default LayoutUser;
