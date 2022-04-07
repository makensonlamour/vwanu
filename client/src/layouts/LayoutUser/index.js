import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetProfile } from "../../features/auth/authSlice";

import { deleteToken } from "../../helpers/index";
import { Transition } from "@headlessui/react";
import { Grid, Box, Paper, styled } from "@mui/material";

//core components
import Loader from "../../components/common/Loader";
import { GrClose } from "react-icons/gr";
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import SidebarRight from "../../components/Sidebars/Right/index";
import BottomNavigation from "../../components/BottomNavigation/index";
import routesPath from "../../routesPath";
import { BottomMenuContext } from "../../context/BottomMenuContext";

//Styles for components

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: "inherit",
  marginTop: "70px",
}));

const LayoutUser = () => {
  const { data: user, error, isFetching } = useGetProfile();
  const location = useLocation();
  const { isSidebarOpen, closeSidebar } = useContext(BottomMenuContext);

  if (error?.response.status === 401) {
    deleteToken();
  }

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div>
            <Navbar user={!isFetching && !error ? user : undefined} />
            <div className="max-w-screen-xl m-auto">
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ backgroundColor: "transparent" }}>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: { xs: "none", sm: "none", md: "block" },
                      position: "sticky",
                    }}
                    style={{ position: "sticky" }}
                  >
                    <Item sx={{ position: "fixed" }} elevation={0}>
                      <SidebarLeft />{" "}
                    </Item>
                  </Grid>
                  {/*for mobile*/}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: { xs: "block", sm: "none" },
                      zIndex: "30",
                    }}
                    style={{ position: "sticky" }}
                  >
                    <Item sx={{ position: "fixed" }} elevation={0}>
                      {/*Mobile Sidebar*/}
                      {isSidebarOpen ? (
                        <button
                          onClick={() => {
                            closeSidebar();
                          }}
                          className="lg:hidden flex text-4xl text-black items-center cursor-pointer fixed right-6 top-20 z-50"
                        >
                          <GrClose size={24} />
                        </button>
                      ) : null}

                      <Transition
                        show={isSidebarOpen}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="lg:hidden">
                          <SidebarLeft />{" "}
                        </div>
                      </Transition>
                    </Item>
                  </Grid>

                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Item elevation={0}>
                      {!isFetching && !error ? (
                        user?.birthday ? null : (
                          <Navigate to={routesPath.STEP_TWO} state={{ from: location }} replace />
                        )
                      ) : null}
                      {user ? (
                        <Outlet context={!isFetching && !error ? user : undefined} />
                      ) : (
                        <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />
                      )}
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: { xs: "none", sm: "none", md: "block" },
                    }}
                  >
                    <Item sx={{ position: "fixed" }} elevation={0}>
                      <div className="hidden lg:block">
                        <SidebarRight />
                      </div>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
              <div>
                <BottomNavigation />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LayoutUser;
