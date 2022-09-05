import React, { useContext } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { MessageContext } from "../../context/MessageContext";

//core components
import Navbar from "../../components/Navbars/index";
import routesPath from "../../routesPath";
import useAuthContext from "../../hooks/useAuthContext";

const LayoutAuth = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const location = useLocation();
  const { countMessage } = useContext(MessageContext);

  if (!user) {
    // deleteToken();
    navigate(routesPath.LOGIN, { from: location.pathname });
  }

  return (
    <>
      <Navbar countMessage={countMessage} user={user ? user : undefined} />
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
