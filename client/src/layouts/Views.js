import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes, role } from "../routes";
//import routesPath from "../routesPath";
import Alerts from "../components/common/Alerts";
import { useSelector } from "react-redux";
import { getAlerts } from "../store/alerts";

//Container
import ContainerUser from "../layouts/containerUser/index";
import ContainerPublic from "../layouts/containerPublic/index";

//Core components
import Error404 from "../pages/ErrorPage/index";

const Views = () => {
  const alerts = useSelector(getAlerts);
  return (
    <>
      <Alerts alerts={alerts} />
      <Routes>
        <Route element={<ContainerPublic />}>
          {routes.map((route) => {
            return <>{route.access === role.PUBLIC ? <Route path={route.path} key={route.name} element={<route.element />} /> : null}</>;
          })}
        </Route>
        <Route path="/" element={<ContainerUser />}>
          {routes.map((route) => {
            return <>{route.access === role.USER ? <Route path={route.path} key={route.name} element={<route.element />} /> : null}</>;
          })}
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Views;
