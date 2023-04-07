import React from "react";
import { Outlet } from "react-router-dom";
// import routesPath from "../../routesPath";
// import useAuthContext from "../../hooks/useAuthContext";

const LayoutGeneral = () => {
  // const { user } = useAuthContext();
  // const location = useLocation();
  // const from = location.state?.from || routesPath.NEWSFEED;

  return <div className="">{<Outlet />}</div>;
};

export default LayoutGeneral;
