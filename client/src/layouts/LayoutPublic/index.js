import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//core components
import { getCurrentUser, setUser } from "../../store/auth";
import { Outlet, Navigate } from "react-router-dom";
import routesPath from "../../routesPath";

const LayoutPublic = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);

  const auth = currentUser.data;

  const loadUser = () => {
    if (auth?.data?.user) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    return dispatch(setUser(token));
  };

  useEffect(() => {
    loadUser();
  }, [auth]);

  return <div className="">{!auth ? <Outlet /> : <Navigate to={routesPath.NEWSFEED} />}</div>;
};

export default LayoutPublic;
