import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import routesPath from "../../routesPath";
import { useGetProfile } from "../../features/auth/authSlice";

// import { deleteToken } from "../../helpers/index";

const LayoutPublic = () => {
  const { data: user } = useGetProfile(["user", "me"]);

  const location = useLocation();
  const from = location.state?.from || routesPath.NEWSFEED;

  return <div className="">{!user ? <Outlet /> : <Navigate to={from} replace={true} />}</div>;
};

export default LayoutPublic;
