import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, setUser, logout } from "../../store/auth";
import { isExpired, decoder } from "../../helpers/index";

//core components
import Navbar from "../../components/Navbars/index";
import routesPath from "../../routesPath";

const LayoutAuth = () => {
  const dispatch = useDispatch();
  let currentUser = useSelector(getCurrentUser);
  const [user, setUserObject] = useState("");

  const auth = currentUser;

  const loadUser = () => {
    if (auth?.token) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    if (isExpired(token)) return dispatch(logout());
    return dispatch(setUser(token));
  };

  const getUser = () => {
    const token = localStorage.getItem("token");
    const data = decoder(token);
    setUserObject(data);
  };

  useEffect(() => {
    loadUser();
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="">
        <div className="h-auto mr-5 my-4 px-16">
          {auth?.token ? user.profile ? console.log(user.profile) : <Outlet /> : <Navigate to={routesPath.LOGIN} />}
        </div>
      </div>
    </>
  );
};

export default LayoutAuth;
