/* eslint-disable no-unused-vars */
export enum CALL_STATUS {
  INITIATED = "initiated",
  ANSWERED = "answered",
  DENIED = "denied",
  CANCELED = "canceled",
  ENDED = "ended",
  CONNECTED = "connected",
}
export enum CALL_DETAILS {
  RESPONDING = "responding",
}

export const peerConfiguration = {
  path: "peerjs",
  host: process.env.REACT_APP_API_URL | "/",
  port: 443 | 4000,
  secure: boolean,
};
