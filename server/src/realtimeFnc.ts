import config from 'config';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { createClient } from 'redis';

//  Custom dependencies
import Log from './lib/utils/logger';

/** Global dependencies */

const UserService: any = {};
const { log } = console;

const users = {};

const savesUser = (user, sock) => {
  const socket = sock !== null || sock !== undefined ? sock : null;
  users[user.id] = { user, socket };
};
const updateUser = (user, socket) => {
  const copy = users[user.id];
  users[user.id] = { ...copy, socket };
};

const saveOrUpdate = (user, socket) => {
  if (users[user.id]) return updateUser(user, socket);
  return savesUser(user, socket);
};
const getUser = (id) => {
  if (users[id]) return users[id];
  return null;
};
const errorHandler = (err) => Log.error(err);

let client;
let messenger;

(async () => {
  client = createClient({ url: process.env.REDIS_URL });
  messenger = createClient({ url: process.env.REDIS_URL });
  client.on('error', errorHandler);
  messenger.on('error', errorHandler);
  await client.connect();
  await messenger.connect();
})();

const handleMessage = async (channel, message) => {
  const { senderId, roomId } = message;
  if (await Promise.all(client.hexists(senderId) && client.hexists(roomId))) {
    // io.(roomId).emit('message',message);
  }
};
messenger.subscribe('message', handleMessage);

export const connect = (socket) => {
  log(`a user connected${socket.id}`);

  socket.on('message');

  socket.on('disconnect', () => {
    log(`the user with socket id ${socket.id} disconnected`);
  });
};

// type AuthenticateUser = { id: string; socketId: string };

// const authenticateSocket = async (userDetails: AuthenticateUser, socket) => {
//   const { id, socketId } = userDetails;
//   const currentUserExist = await client.hexists(id);
//   if (!currentUserExist)
//     client.hset(id, 'socketId', socketId, 'socket', socket);
// };

export const changeConnectionStatus = async (
  id: string | number
): Promise<any> => {
  log(' in there');
  const currentUser = await UserService.getUser(id);
  if (!currentUser) throw new Error('The user does not exist');
  await UserService.updateUser(currentUser, { online: true });
  return currentUser;
};

export const saveInRedis = async (user, socketId) => {
  const saveUser = await client.set(
    user.id,
    JSON.stringify({ ...user, socketId })
  );
  log(saveUser);
};
const notifyOnline = (socket, user) => {
  socket.emit('notify-status-online', { user });
};

export function checkAuth(payload, done) {
  UserService.getUser(payload.user.id)
    .then((user) => {
      if (!user) return done(null, false, 'user does not exist');
      return done(null, user);
    })
    .catch((err) => done(err));
}

export const isLoggedIn = (socket, next) => {
  try {
    const token = socket.handshake.headers['x-auth-token'];
    if (!token) {
      log(`this ${socket.id} does not send a token`);
      return next({
        message: 'Missing Authentication token',
        status: StatusCodes.BAD_REQUEST,
      });
    }

    return jwt.verify(
      token,
      config.get<string>('JWT_SECRET') as jwt.Secret,
      async (err, decoded) => {
        if (err && !decoded) {
          log(`this ${socket.id} sent an invalid token err: ${err.message}`);
          return next({
            message: err.message,
            status: StatusCodes.UNAUTHORIZED,
          });
        }
        // eslint-disable-next-line no-param-reassign
        const id = (<any>decoded).user;
        const user = await changeConnectionStatus(id.id);
        const u = {
          id: user.id,
          online: user.online,
          profile: user.profilePicture,
          firstName: user.firstName,
        };
        await saveInRedis(u, socket.id);
        notifyOnline(socket, u);
        return next();
      }
    );
  } catch (e) {
    return next({
      message: e.message || 'You sent and invalid token',
      status: e.status || StatusCodes.BAD_REQUEST,
    });
  }
};

export const handleDisconnect = async (socket) => {
  // need to find the corresponding user in redis

  // update the current user online status to false

  // find his online friends

  // notify his online friends he has disconnected.

  log(`socket id ${socket.id} disconnected`);
  log(socket.handshake);
};

const toggleOnline = async (user, status: boolean) => {
  await UserService.updateUser(user, { online: status, lastSeen: new Date() });
};
const notifyOnlineFriend = async (user, socket, status) => {
  const friendsRoom = `${user.id}-friend-room`;
  const friends = await user.getFriends({ where: { online: true } });
  friends.forEach(async (friend) => {
    let onlineFriend = await getUser(friend.id);
    if (!onlineFriend) return;
    onlineFriend = JSON.parse(onlineFriend);
    onlineFriend.socket.join(friendsRoom);
  });
  const { id, firstName, lastName, profilePicture } = user;

  socket.broadcast.to(friendsRoom).emit('new_user_status', {
    id,
    firstName,
    lastName,
    profilePicture,
    online: status,
  });
};

export const wrapperAroundConnect = (io) => async (socket) => {
  saveOrUpdate(socket.request.user, socket);
  if (!socket.request.online) {
    await toggleOnline(socket.request.user, true);
    await notifyOnlineFriend(socket.request.user, socket, true);
  }

  socket.on('message', (data) => {
    io.emit('message', socket.user + data);
  });

  socket.on('disconnect', async () => {
    log('disconnected');
    await toggleOnline(socket.request.user, false);
    await notifyOnlineFriend(socket.request.user, socket, false);
  });
};
