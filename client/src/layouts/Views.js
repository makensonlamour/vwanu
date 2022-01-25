import React from "react";
import { Route, Routes } from "react-router-dom";
import Alerts from "../components/common/Alerts";
import { useSelector } from "react-redux";
import { getAlerts } from "../store/alerts";

//Core components
import Login from "../views/Login/index";
import Register from "../views/Register/index";
import Home from "../views/Home/index";
import ProtectRoutes from "../layouts/ProtectedRoutes/index";
import Error404 from "../views/ErrorPage/index";

const Views = () => {
  const alerts = useSelector(getAlerts);
  return (
    <>
      <Alerts alerts={alerts} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectRoutes />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Views;
