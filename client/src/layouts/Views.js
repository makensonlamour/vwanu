import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes, role } from "../routes";
//import routesPath from "../routesPath";
import Alerts from "../components/common/Alerts";
import { useSelector } from "react-redux";
import { getAlerts } from "../store/alerts";

//Container
import LayoutUser from "./LayoutUser/index";
import LayoutPublic from "./LayoutPublic/index";
import LayoutAuth from "./LayoutAuth/index";

//Core components
import NotFound from "../pages/NotFound/index";

const Views = () => {
  const alerts = useSelector(getAlerts);
  return (
    <>
      <Alerts alerts={alerts} />
      <Routes>
        <Route element={<LayoutPublic />}>
          {routes.map((route) => {
            return <>{route.access === role.PUBLIC ? <Route path={route.path} key={route.name} element={<route.element />} /> : null}</>;
          })}
        </Route>
        <Route path="/" element={<LayoutAuth />}>
          {routes.map((route) => {
            return <>{route.access === role.AUTH ? <Route path={route.path} key={route.name} element={<route.element />} /> : null}</>;
          })}
        </Route>
        <Route path="/" element={<LayoutUser />}>
          {routes.map((route) => {
            return <>{route.access === role.USER ? <Route path={route.path} key={route.name} element={<route.element />} /> : null}</>;
          })}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Views;
