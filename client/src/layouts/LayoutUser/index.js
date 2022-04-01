import React, { useEffect, useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";
import { isExpired, decoder } from "../../helpers/index";
import { useFetchUserQuery } from "../../features/user/userSlice";
import { Transition } from "@headlessui/react";

//core components
import Loader from "../../components/common/Loader";
import { GrClose } from "react-icons/gr";
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import SidebarRight from "../../components/Sidebars/Right/index";
import BottomNavigation from "../../components/BottomNavigation/index";
import routesPath from "../../routesPath";
import { BottomMenuContext } from "../../context/BottomMenuContext";

const LayoutUser = () => {
  const userData = decoder(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const location = useLocation();
  let currentUser = useAuth();
  const { isSidebarOpen, closeSidebar } = useContext(BottomMenuContext);

  const auth = currentUser;

  const { data, isLoading, isSuccess, error } = useFetchUserQuery(userData?.user?.id);

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

  useEffect(() => {
    //closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col mx-auto space-y-0">
            <Navbar dataUser={isSuccess && !error ? data?.data : undefined} />
            <div className="flex px-2 ">
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

              <div className="w-[0vw] lg:w-[30vw] lg:p-0 pr-0">
                <div className="hidden lg:inline-block py-6 lg:p-0">
                  <SidebarLeft />
                </div>
                {/*Mobile Sidebar*/}
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
              </div>
              {isSuccess ? (
                data?.data?.user?.birthday ? null : (
                  <Navigate to={routesPath.STEP_TWO} state={{ from: location }} replace />
                )
              ) : null}
              <div className="w-[100vw] lg:w-[50vw] space-y-2 lg:flex-start">
                {auth?.data?.data ? (
                  <Outlet context={isSuccess && !error ? data?.data : undefined} />
                ) : (
                  <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />
                )}
              </div>
              <div className="hidden lg:block">
                <SidebarRight />
              </div>
            </div>
            <div>
              <BottomNavigation />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LayoutUser;
