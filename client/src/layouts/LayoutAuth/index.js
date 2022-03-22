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
import routesPath from "../../routesPath";

const LayoutAuth = () => {
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
          {/*  {data?.data?.user?.birthday ? <Navigate to={routesPath.NEWSFEED} state={{ from: location }} replace /> : null} */}

          <div className="">
            <div className="h-auto mr-5 my-4 px-4 lg:px-16">
              {auth?.data?.data ? (
                <Outlet context={isSuccess && !error ? data?.data : undefined} />
              ) : (
                <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LayoutAuth;
