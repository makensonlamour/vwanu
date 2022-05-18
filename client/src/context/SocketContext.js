import React from "react";
import { createContext, useReducer, useEffect } from "react";
const Types = {
  SET: "SET",
};
const initialState = {
  socket: null,
};
export const SocketContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case Types.SET:
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};
// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {}, []);
  return <SocketContext.Provider value={{ ...state, dispatch, Types }}>{children}</SocketContext.Provider>;
};
