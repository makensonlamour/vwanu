import React from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";

import { Paper, styled } from "@mui/material";

//core components
import routesPath from "../../routesPath";
import useAuthContext from "../../hooks/useAuthContext";
//Styles for components

const Item = styled(Paper)(() => ({
  backgroundColor: "inherit",
}));
const LayoutCall = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    // deleteToken();
    navigate(routesPath.LOGIN, { from: location.pathname });
  }

  return (
    <>
      <div className="mx-auto">
        <div className="w-[100vw] md:w-[90vw] lg:w-[94vw]">
          <Item elevation={0} className="max-w-screen-xxl w-[100vw] sm:w-[90vw] mx-auto">
            {user ? <Outlet context={user || undefined} /> : <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />}
          </Item>
        </div>
      </div>
    </>
  );
};

export default LayoutCall;
