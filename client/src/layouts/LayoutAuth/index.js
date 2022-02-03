import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, setUser } from "../../store/auth";

//core components
import Navbar from "../../components/Navbars/index";
import routesPath from "../../routesPath";

//import Views from "../Views";

const LayoutAuth = () => {
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

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <div className="basis-3/5 drawer drawer-mobile h-auto mr-5 px-10">{auth ? <Outlet /> : <Navigate to={routesPath.LOGIN} />}</div>
      </div>
    </>
  );
};

export default LayoutAuth;
