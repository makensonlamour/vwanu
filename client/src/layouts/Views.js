import io from "socket.io-client";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { routes, role } from "../routes";

//Container
import LayoutUser from "./LayoutUser/index";
import LayoutPublic from "./LayoutPublic/index";
import LayoutAuth from "./LayoutAuth/index";

//Core components
import NotFound from "../pages/NotFound/index";
import { getToken } from "../helpers";
import useSocketContext from "../hooks/useSocketcontext";

const Views = () => {
  const { dispatch, Types, socket } = useSocketContext();
  const serverUrl = "http://localhost:4000";
  const token = getToken();

  const setSocket = () => {
    if (socket) return;
    const newSocket = io(serverUrl, {
      extraHeaders: {
        "x-auth-token": token,
      },
    });

    dispatch({ type: Types.SET, payload: newSocket });
    return () => newSocket.close();
  };
  useEffect(setSocket, [Types.SET, dispatch, socket, token]);

  // const serverUrl = "http://localhost:4000";
  // const [socket, setSocket] = useState(null);
  // const token = getToken();
  // const { user } = decoder(token);
  // useEffect(() => {
  //   // if (!isLogged()) return;
  //   const newSocket = io(serverUrl, {
  //     extraHeaders: {
  //       ["x-auth-token"]: token,
  //     },
  //   });
  //   newSocket.on(`notification-${user.id}`, (val) => console.log(val));

  //   console.log(socket);
  //   setSocket(newSocket);
  //   return () => console.log("closing socket");
  // }, [setSocket]);
  return (
    <>
      <div className="mx-auto ">
        <Routes>
          <Route key={0} element={<LayoutPublic />}>
            {routes.map((route, idx) => {
              return (
                <>{route.access === role.PUBLIC ? <Route key={idx} path={route.path} element={<route.element exact={true} />} /> : null}</>
              );
            })}
          </Route>
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
        </Routes>
      </div>
    </>
  );
};

export default Views;
