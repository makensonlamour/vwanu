import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes, role } from "../routes";

//Container
import LayoutUser from "./LayoutUser/index";
import LayoutPublic from "./LayoutPublic/index";
import LayoutAuth from "./LayoutAuth/index";

//Core components
import NotFound from "../pages/NotFound/index";

const Views = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        <Routes>
          <Route element={<LayoutPublic />}>
            {routes.map((route) => {
              return (
                <>
                  {route.access === role.PUBLIC ? (
                    <Route path={route.path} key={route.name} element={<route.element exact={true} />} />
                  ) : null}
                </>
              );
            })}
          </Route>
          <Route path="/" element={<LayoutUser />}>
            {routes.map((route) => {
              return (
                <>
                  {route.access === role.USER ? (
                    <Route path={route.path} key={route.name} element={<route.element />} exact={true} />
                  ) : null}
                </>
              );
            })}
          </Route>
          <Route path="/" element={<LayoutAuth />}>
            {routes.map((route) => {
              return (
                <>
                  {route.access === role.AUTH ? (
                    <Route path={route.path} key={route.name} element={<route.element />} exact={true} />
                  ) : null}
                </>
              );
            })}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default Views;
