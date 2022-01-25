import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/auth";

//core components
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import SidebarRight from "../../components/Sidebars/Right/index";
import routesPath from "../../routesPath";

//import Views from "../Views";

const Container = () => {
  let currentUser = useSelector(getCurrentUser);

  const auth = currentUser.data;
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <div className="basis-1/5 mr-5">
          <SidebarLeft />
        </div>
        <div className="basis-3/5 drawer drawer-mobile h-auto mr-5 px-10">{auth ? <Outlet /> : <Navigate to={routesPath.LOGIN} />}</div>
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

export default Container;
