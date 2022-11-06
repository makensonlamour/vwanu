import React, { createContext, useReducer, useEffect } from "react";
import client from "../features/feathers";
const Types = {
  USER_LOGGED_IN: "LOGIN",
  USER_LOGGED_OUT: "LOG_OUT",
  AUTH_IS_READY: "AUTH_READY",
  USER_UPDATED: "USER_UPDATED",
};
const initialState = {
  user: null,
  authIsReady: false,
};
export const AuthContext = createContext();
export const authReducer = (state, action) => {
  switch (action.type) {
    case Types.USER_LOGGED_IN:
      return { ...state, user: action.payload };
    case Types.USER_LOGGED_OUT:
      return { ...state, user: null };
    case Types.AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };
    case Types.USER_UPDATED:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const reAuth = async () => {
    try {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

      const acc = params.access_token;
      if (acc) {
        await client.authentication.setAccessToken(acc);
        window.location.href = "/";
      }

      const res = await client.reAuthenticate();
      dispatch({ type: Types.AUTH_IS_READY, payload: res.User });
    } catch (error) {
      console.warn(error);
      dispatch({ type: Types.AUTH_IS_READY, payload: null });
    }
    // console.log(res);
  };
  useEffect(() => {
    reAuth();
  }, []);
  return <AuthContext.Provider value={{ ...state, dispatch, Types }}>{children}</AuthContext.Provider>;
};
