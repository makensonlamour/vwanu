import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {} from "react-router-dom";

//core components
import { setUser, logout } from "../../features/auth/authSlice";
import { useAuth } from "../../hooks/useAuth";
import { isExpired } from "../../helpers/index";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import routesPath from "../../routesPath";

const LayoutPublic = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || routesPath.NEWSFEED;
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

  return <div className="">{!auth?.data?.data ? <Outlet /> : <Navigate to={from} replace={true} />}</div>;
};

export default LayoutPublic;
