import { createClient } from 'redis';
import Log from './lib/utils/logger';

const doNothing = (arg) => {
  const { log } = console;
  log(arg);
};
let client;
(async () => {
  client = createClient({ url: process.env.REDIS_URL });
  client.on('error', (err) => Log.error('Redis Client Error', err));
  await client.connect();
})();

export const connect = (socket) => {
//   doNothing('a user connected' + socket.id);
  socket.on('authenticate', (user: { id: string; socketId: string }) => {
    const { id, socketId } = user;
    doNothing({ id, socketId });
  });

  socket.on('disconnect', () => {
    doNothing(`the user with socket id ${socket.id} disconnected`);
  });
};

export default connect;
