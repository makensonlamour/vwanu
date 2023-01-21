import React, { createContext, useReducer, useEffect } from "react";
import { Peer } from "peerjs";

import client from "../features/feathers";
const Types = {
  USER_LOGGED_IN: "LOGIN",
  USER_LOGGED_OUT: "LOG_OUT",
  AUTH_IS_READY: "AUTH_READY",
  USER_UPDATED: "USER_UPDATED",
  USER_ON_CALL: "USER_ON_CALL",
  USER_INCOMING_CALL: "USER_INCOMING_CALL",
};
const initialState = {
  user: null,
  authIsReady: false,
  peer: null,
  onCall: false,
  incomingCall: false,
  call: null,
};
export const AuthContext = createContext();
let peer = null;
export const authReducer = (state, action) => {
  switch (action.type) {
    case Types.USER_LOGGED_IN:
      peer = action?.payload?.id ? new Peer(action.payload.id) : null;
      console.log(`Peer id registered`, peer);
      return { ...state, user: action.payload, peer };
    case Types.USER_LOGGED_OUT:
      return { ...state, user: null };
    case Types.AUTH_IS_READY:
      peer = action?.payload?.id ? new Peer(action.payload.id) : null;
      console.log(`Peer id registered`, peer);
      return { ...state, user: action.payload, authIsReady: true, peer };
    case Types.USER_UPDATED:
      return { ...state, user: action.payload };
    case Types.USER_ON_CALL:
      return { ...state, onCall: action.payload };
    case Types.USER_INCOMING_CALL:
      return { ...state, incomingCall: true, call: action.payload };
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
