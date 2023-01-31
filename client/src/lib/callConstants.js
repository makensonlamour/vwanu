export const CALL_STATUS = {
  INITIATED: "initiated",
  ANSWERED: "answered",
  DENIED: "denied",
  CANCELED: "canceled",
  ENDED: "ended",
  CONNECTED: "connected",
};
export const CALL_DETAILS = {
  RESPONDING: "responding",
};

export const peerConfiguration = {
  path: "peerjs",
  host: process.env.REACT_APP_API_URL ?? "/",
  port: process.env.REACT_APP_API_URL ? 443 : 4000,
  secure: process.env.REACT_APP_API_URL ? true : false,
};
