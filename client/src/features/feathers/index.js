import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";

export const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";

const socket = io(baseUrl);
const client = feathers();

client.configure(socketio(socket));
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

export default client;
