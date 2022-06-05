import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes, role } from "../routes";

//Container
import LayoutUser from "./LayoutUser/index";
import LayoutPublic from "./LayoutPublic/index";
import LayoutAuth from "./LayoutAuth/index";

//Core components
import NotFound from "../pages/NotFound/index";
// import useAuthContext from "../hooks/useAuthContext";

const Views = () => {
  // const { user } = useAuthContext();
  return (
    <>
      <div className="mx-auto bg-placeholder-color">
        <Routes>
          !user?
          <Route key={0} element={<LayoutPublic />}>
            {routes.map((route, idx) => {
              return (
                <>{route.access === role.PUBLIC ? <Route key={idx} path={route.path} element={<route.element exact={true} />} /> : null}</>
              );
            })}
          </Route>
          :
          <>
            <Route key={1} path="/" element={<LayoutUser />}>
              {routes.map((route, idx) => {
                return (
                  <>{route.access === role.USER ? <Route key={idx} path={route.path} element={<route.element />} exact={true} /> : null}</>
                );
              })}
            </Route>
            <Route key={2} path="/" element={<LayoutAuth />}>
              {routes.map((route, idx) => {
                return (
                  <>{route.access === role.AUTH ? <Route key={idx} path={route.path} element={<route.element />} exact={true} /> : null}</>
                );
              })}
            </Route>
            <Route key={3} path="*" element={<NotFound />} />
          </>
        </Routes>
      </div>
    </>
  );
};

export default Views;
