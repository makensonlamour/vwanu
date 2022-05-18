import React, { useContext } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useGetProfile } from "../../features/auth/authSlice";

import { deleteToken } from "../../helpers/index";
// import { Transition } from "@headlessui/react";
import { Paper, styled } from "@mui/material";

//core components
// import Loader from "../../components/common/Loader";
// import { GrClose } from "react-icons/gr";
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import MobileSidebar from "../../components/Sidebars/Left/MobileSidebar";
// import SidebarRight from "../../components/Sidebars/Right/index";
// import BottomNavigation from "../../components/BottomNavigation/index";
import routesPath from "../../routesPath";
import { BottomMenuContext } from "../../context/BottomMenuContext";

//Styles for components

const Item = styled(Paper)(() => ({
  backgroundColor: "inherit",
}));

const LayoutUser = () => {
  const { data: user, error } = useGetProfile(["user", "me"]);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSidebarOpen } = useContext(BottomMenuContext);

  if (error?.response?.status === 401) {
    deleteToken();
    navigate(routesPath.LOGIN, { from: location.pathname });
  }

  return (
    <>
      <div className="mx-auto">
        <div className="flex">
          <div className="grow hidden md:block">
            <SidebarLeft user={!error ? user : undefined} />
          </div>
          <div className="w-[100vw] md:w-[90vw] lg:w-[94vw]">
            {isSidebarOpen ? (
              <div className={`${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:hidden ease-in-out duration-300`}>
                <MobileSidebar user={!error ? user : undefined} />
              </div>
            ) : null}
            <Navbar user={!error ? user : undefined} />

            <Item elevation={0} className="max-w-screen-xxl w-[90vw] mx-auto ">
              {!error ? user?.birthday ? null : <Navigate to={routesPath.STEP_TWO} state={{ from: location }} replace /> : null}
              {user ? (
                <Outlet context={!error ? user : undefined} />
              ) : (
                <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />
              )}
            </Item>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutUser;
