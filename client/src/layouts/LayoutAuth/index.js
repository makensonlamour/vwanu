import React from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

//core components
import Navbar from "../../components/Navbars/index";
import routesPath from "../../routesPath";
import useAuthContext from "../../hooks/useAuthContext";

const LayoutAuth = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const location = useLocation();

  if (!user) {
    // deleteToken();
    navigate(routesPath.LOGIN, { from: location.pathname });
  }

  return (
    <>
      <Navbar user={user ? user : undefined} />
      {user?.birthday ? <Navigate to={routesPath.NEWSFEED} state={{ from: location }} replace /> : null}
      <div className="">
        <div className="h-auto mr-5 my-4 px-4 lg:px-16">
          {user ? <Outlet context={user ? user : undefined} /> : <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />}
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
