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

const baseUrl = process.env.REACT_APP_API_URL ? "vwanu.webvitals.org" + "/api" : null;

export const peerConfiguration = {
  path: "peerjs",
  host: baseUrl ?? "/",
  port: baseUrl ? 443 : 4000,
  secure: baseUrl ? true : false,
};
