import React, { useContext } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

import { Paper, styled } from "@mui/material";

//core components
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import MobileSidebar from "../../components/Sidebars/Left/MobileSidebar";
import routesPath from "../../routesPath";
import { BottomMenuContext } from "../../context/BottomMenuContext";
import useAuthContext from "../../hooks/useAuthContext";
//Styles for components

const Item = styled(Paper)(() => ({
  backgroundColor: "inherit",
}));
const LayoutUser = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { isSidebarOpen } = useContext(BottomMenuContext);

  if (!user) {
    // deleteToken();
    navigate(routesPath.LOGIN, { from: location.pathname });
  }

  return (
    <>
      <div className="mx-auto">
        <div className="flex overflow-auto">
          <div className="grow hidden md:block">
            <SidebarLeft user={user ? user : undefined} />
          </div>
          <div className="w-[100vw] md:w-[90vw] lg:w-[94vw]">
            {isSidebarOpen ? (
              <div className={`${isSidebarOpen ? "translate-x-0" : "translate-x-full"} md:hidden ease-in-out duration-300`}>
                <MobileSidebar user={user ? user : undefined} />
              </div>
            ) : (
              <>
                {" "}
                <Navbar user={user ? user : undefined} />
                <Item elevation={0} className="max-w-screen-xxl w-[100vw] sm:w-[90vw] mx-auto">
                  {user && !user?.birthday && <Navigate to={routesPath.STEP_TWO} state={{ from: location }} replace />}

                  {user ? <Outlet context={user || undefined} /> : <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />}
                </Item>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutUser;
