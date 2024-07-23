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
  const email = localStorage.getItem("email");

  if (!user) {
    // deleteToken();
    console.log("test", email);
    if (email !== "" && email !== undefined) {
      navigate(routesPath.LOCKSCREEN, { from: location.pathname });
    } else {
      navigate(routesPath.LOGIN, { from: location.pathname });
    }
  }

  // Navigate to lockscreen

  return (
    <>
      <Navbar countMessage={countMessage} user={user ? user : undefined} />
      {user?.birthday ? <Navigate to={routesPath.NEWSFEED} state={{ from: location }} replace /> : null}
      <div className="">
        <div className="h-auto my-4 px-4 lg:px-16">
          {user ? (
            <Outlet context={user ? user : undefined} />
          ) : email !== "" && email !== undefined ? (
            <Navigate to={routesPath.LOCKSCREEN} state={{ from: location }} replace />
          ) : (
            <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />
          )}
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
