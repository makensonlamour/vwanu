/* eslint-disable*/
import React from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useGetProfile } from "../../features/auth/authSlice";

import { deleteToken } from "../../helpers/index";
// import { Transition } from "@headlessui/react";
import { Grid, Box, Paper, styled } from "@mui/material";

//core components
// import Loader from "../../components/common/Loader";
// import { GrClose } from "react-icons/gr";
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
// import SidebarRight from "../../components/Sidebars/Right/index";
// import BottomNavigation from "../../components/BottomNavigation/index";
import routesPath from "../../routesPath";
// import { BottomMenuContext } from "../../context/BottomMenuContext";

//Styles for components

const Item = styled(Paper)(() => ({
  backgroundColor: "inherit",
}));

const LayoutUser = () => {
  const { data: user, error } = useGetProfile(["user", "me"]);
  const location = useLocation();
  const navigate = useNavigate();
  // const { isSidebarOpen, closeSidebar } = useContext(BottomMenuContext);

  if (error?.response?.status === 401) {
    deleteToken();
    navigate(routesPath.LOGIN, { from: location.pathname });
  }

  return (
    <>
      <div className="mx-auto w-screen">
        <div className="flex">
          <div className="grow">
            <SidebarLeft />
          </div>
          <div className="w-screen">
            <Navbar user={!error ? user : undefined} />
          </div>
        </div>
      </div>
      {/*}
        <Navbar user={!error ? user : undefined} />
        <div className="m-auto">
          <Box elevation={0} sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} sx={{ backgroundColor: "transparent", boxShadow: 0 }}>
              <Grid item xs style={{ marginTop: 0 }}>
                <Item>
                  <Grid item xs={4} style={{ position: "fixed" }}>
                    <Item sx={{ position: "fixed", zIndex: "appBar" }} elevation={0}>
                      <SidebarLeft />{" "}
                    </Item>
                  </Grid>
                </Item>
              </Grid>
              <Grid item xs={10}>
                <Item>
                  <Grid item xs={12}>
                    <Item className="max-w-screen-xxl">
                      {!error ? user?.birthday ? null : <Navigate to={routesPath.STEP_TWO} state={{ from: location }} replace /> : null}
                      {user ? (
                        <Outlet context={!error ? user : undefined} />
                      ) : (
                        <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />
                      )}
                    </Item>
                  </Grid>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
                      {*/}
    </>
  );
};

export default LayoutUser;
