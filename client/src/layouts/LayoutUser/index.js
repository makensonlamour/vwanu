import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, setUser, logout } from "../../store/auth";
import { isExpired, decoder } from "../../helpers/index";

//core components
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import SidebarRight from "../../components/Sidebars/Right/index";
import routesPath from "../../routesPath";

const LayoutUser = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);
  const [user, setUserObject] = useState("");

  const auth = currentUser;

  const loadUser = () => {
    if (auth?.token) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    if (isExpired(token)) return dispatch(logout());
    return dispatch(setUser(token));
  };

  const getUser = () => {
    const token = localStorage.getItem("token");
    const data = decoder(token);
    setUserObject(data);
  };

  useEffect(() => {
    loadUser();
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <div className="basis-1/5 mr-5">
          <SidebarLeft />
        </div>
        <div className="basis-3/5 drawer drawer-mobile h-auto mr-5 px-10">
          {auth?.token ? user?.profile ? <Outlet /> : <Navigate to={routesPath.STEP_TWO} /> : <Navigate to={routesPath.LOGIN} />}
        </div>
        <div className="basis-1/5 mr-5">
          {" "}
          <div className="">
            <SidebarRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutUser;
