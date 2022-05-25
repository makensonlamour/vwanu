import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import routesPath from "../../routesPath";
import useAuthContext from "../../hooks/useAuthContext";

const LayoutPublic = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const from = location.state?.from || routesPath.NEWSFEED;

  return <div className="">{!user ? <Outlet /> : <Navigate to={from} replace={true} />}</div>;
};

export default LayoutPublic;
