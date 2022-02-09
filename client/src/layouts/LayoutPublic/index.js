import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//core components
import { getCurrentUser, setUser, logout } from "../../store/auth";
import { isExpired } from "../../helpers/index";
import { Outlet, Navigate } from "react-router-dom";
import routesPath from "../../routesPath";

const LayoutPublic = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);

  const auth = currentUser;

  const loadUser = () => {
    if (auth?.token) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    if (isExpired(token)) return dispatch(logout());
    return dispatch(setUser(token));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return <div className="">{!auth?.token ? <Outlet /> : <Navigate to={routesPath.NEWSFEED} />}</div>;
};

export default LayoutPublic;
