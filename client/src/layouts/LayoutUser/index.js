import React, { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";
import { isExpired, decoder } from "../../helpers/index";
import { useFetchUserQuery } from "../../features/api/apiSlice";

//core components
import Loader from "../../components/common/Loader";
import Navbar from "../../components/Navbars/index";
import SidebarLeft from "../../components/Sidebars/Left/index";
import SidebarRight from "../../components/Sidebars/Right/index";
import routesPath from "../../routesPath";

const LayoutUser = () => {
  const userData = decoder(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const location = useLocation();
  let currentUser = useAuth();

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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar dataUser={isSuccess && !error ? data?.data : undefined} />
          <div className="lg:flex lg:flex-row">
            <div className="hidden lg:inline lg:basis-[25%]">
              <SidebarLeft />
            </div>
            {/* {data?.data?.user?.birthday ? null : <Navigate to={routesPath.STEP_TWO} state={{ from: location }} replace />} */}
            <div className="w-full lg:basis-[50%] lg:ml-28">
              {auth?.data?.data ? (
                <Outlet context={isSuccess && !error ? data?.data : undefined} />
              ) : (
                <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />
              )}
            </div>

            <div className="hidden lg:block lg:basis-[25%]">
              <SidebarRight />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LayoutUser;
