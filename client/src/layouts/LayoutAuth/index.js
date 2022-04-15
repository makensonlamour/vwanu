import React from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useGetProfile } from "../../features/auth/authSlice";
import { deleteToken } from "../../helpers/index";

//core components
import Navbar from "../../components/Navbars/index";
import routesPath from "../../routesPath";

const LayoutAuth = () => {
  const navigate = useNavigate();
  const { data: user, error } = useGetProfile(["user", "me"]);

  const location = useLocation();

  if (error?.response?.status === 401) {
    deleteToken();
    navigate(routesPath.LOGIN, { from: location.pathname });
  }

  return (
    <>
      <Navbar user={!error ? user : undefined} />
      {/* user?.birthday ? <Navigate to={routesPath.NEWSFEED} state={{ from: location }} replace /> : null*/}
      <div className="">
        <div className="h-auto mr-5 my-4 px-4 lg:px-16">
          {user ? <Outlet context={!error ? user : undefined} /> : <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />}
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
