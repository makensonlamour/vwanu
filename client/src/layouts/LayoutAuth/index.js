import React, { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";
import { isExpired } from "../../helpers/index";

//core components
import Navbar from "../../components/Navbars/index";
import routesPath from "../../routesPath";

const LayoutAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let currentUser = useAuth();

  const auth = currentUser;

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
      <Navbar />
      <div className="">
        <div className="h-auto mr-5 my-4 px-16">
          {auth?.data?.data ? <Outlet /> : <Navigate to={routesPath.LOGIN} state={{ from: location }} replace />}
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
