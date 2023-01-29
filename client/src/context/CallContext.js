import isNil from "lodash/isNil";
import React, { createContext, useReducer, useEffect } from "react";
import { Peer } from "peerjs";
import useAuthContext from "../hooks/useAuthContext";
import loadMedia from "../lib/loadMedia";
import appendStreamToPage from "../lib/appendStreamToPage";
import client from "../features/feathers";

const Types = {
  PEER_STATUS_CHANGE: "PEER_STATUS",
  USER_ON_CALL: "USER_ON_CALL",
  REGISTER_PEER: "REGISTER_PEER",
  ACTIVE_CALL_ACCEPTED: "ACTIVE_CALL_ACCEPTED",
  USER_INCOMING_CALL: "USER_INCOMING_CALL",
  INCOMING_CALL_ACCEPTED: "INCOMING_CALL_ACCEPTED",
  USER_OUTGOING_CALL: "USER_OUTGOING_CALL",
  SET_ERROR: "SET_ERROR",
};

const peerConfiguration = () => {
  // const serverType = process.env.REACT_APP_API_URL ? "remote" : "local";

  //const host = process.env.REACT_APP_API_URL ?? "http://127.0.0.1";

  return {
    host: "/",
    path: "peerjs",
    port: 4000, //serverType === "remote" ? 443 : 4000,
    //secure: serverType === "remote" ? true : false,
  };
};

/**
 * initial state of the call context
 * @typedef {Object} CallState
 * @property {MediaStream} stream - user stream
 * @property {boolean} onCall - user is on call
 * @property {boolean} outGoingCall - user is making a call
 * @property {boolean} incomingCall - user is receiving a call
 * @property {MediaConnection} call - call object
 * @property {Object} callData - call data
 *
 */
const initialState = {
  user: null,
  authIsReady: false,
  peer: null,
  onCall: false,
  incomingCall: false,
  call: null,
  peerStatus: false,
  caller: null,
  error: null,
};

export const CALL_STATUS = {
  INITIATED: "initiated",
  ANSWERED: "answered",
  DENIED: "denied",
  CANCELED: "canceled",
  ENDED: "ended",
  CONNECTED: "connected",
};
export const CallContext = createContext();

export const callReducer = (state, action) => {
  switch (action.type) {
    case Types.USER_ON_CALL:
      return { ...state, onCall: action.payload };
    case Types.USER_INCOMING_CALL:
      return { ...state, incomingCall: true, call: action.payload };
    case Types.ACTIVE_CALL_ACCEPTED:
      return { ...state, incomingCall: false, call: action.payload };
    case Types.REGISTER_PEER:
      return { ...state, peer: action.payload };
    case Types.INCOMING_CALL_ACCEPTED:
      return { ...state, incomingCall: false };
    case Types.USER_OUTGOING_CALL:
      return { ...state, call: action.payload, onCall: true };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const CallContextProvider = ({ children }) => {
  const callService = client.service("call");
  const [state, dispatch] = useReducer(callReducer, initialState);
  const { user } = useAuthContext();
  // func

  useEffect(() => {
    try {
      const peer = isNil(user) ? null : new Peer(user.id, peerConfiguration());
      dispatch({ type: Types.REGISTER_PEER, payload: peer });

      peer?.on("call", (peerCall) => {
        if (state.call) return;
        dispatch({ type: Types.INCOMING_CALL_ACCEPTED });
        const options = state.call.type === "video" ? { video: true, audio: true } : { audio: true, muted: true };
        loadMedia(
          options,
          (stream) => {
            const media = state.call.type === "video" ? document.createElement("video") : document.createElement("audio");
            media.muted = true;
            appendStreamToPage(media, stream, console.log);
            peerCall.answer(stream);
            peerCall.on("stream", (remoteStream) => {
              console.log("\n\n\n\n\n\n\n\n STREAMING \n\n\n\n", remoteStream);
              const media = state.call.type === "video" ? document.createElement("video") : document.createElement("audio");
              media.muted = false;
              appendStreamToPage(media, remoteStream, console.log);
            });
            callService.patch(state.call.id, { status: CALL_STATUS.CONNECTED }).catch((e) => {
              console.log('we could not update the call status to "connected"', e);
            });
          },
          (err) => {
            dispatch({ type: Types.SET_ERROR, payload: err.message || "Error loading media to answer incoming call" });
          }
        );
      });
      state.peer?.on("connection", (data) => {
        console.log("connection established to server:", data);
        dispatch({ type: Types.PEER_STATUS_CHANGE, payload: true });
      });
      state.peer?.on("open", () => {
        console.log("opened to server");
      });
    } catch (error) {
      console.log(`Error connecting peer`);
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return <CallContext.Provider value={{ ...state, dispatch, Types }}>{children}</CallContext.Provider>;
};
