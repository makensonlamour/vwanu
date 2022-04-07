import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetProfile } from "../../features/auth/authSlice";

//core components
import Loader from "../../components/common/Loader";
import Navbar from "../../components/Navbars/index";
import routesPath from "../../routesPath";

const LayoutAuth = () => {
  const { data: user, error, isLoading, isSuccess } = useGetProfile();

  const location = useLocation();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar user={isSuccess && !error ? user : undefined} />
          {/* user?.birthday ? <Navigate to={routesPath.NEWSFEED} state={{ from: location }} replace /> : null*/}
          <div className="">
            <div className="h-auto mr-5 my-4 px-4 lg:px-16">
              {user ? (
                <Outlet context={isSuccess && !error ? user : undefined} />
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
