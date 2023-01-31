import express from '@feathersjs/express';
import { Request, Response, NextFunction } from 'express';
import { ExpressPeerServer } from 'peer';

import app from '../app';
import common from '../lib/utils/common';
import Logger from '../lib/utils/logger';

const { sendErrorResponse } = common;

function normalizePort(val: string): number | string | null {
  const port = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return null;
}
function onListening(server) {
  const addr = server.address();
  const bind: string | null =
    typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr?.port}`;
  Logger.info(`Listening on ${bind} `);
}
const port = normalizePort(process.env.PORT || '6000');
function onError(error: any): void {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      Logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(`${bind}  is already in use`);
      process.exit(1);
      break;
    default:
      Logger.error(error);
      process.exit(1);
  }
}

const server = app.listen(port);
const PeerJsServer = ExpressPeerServer(server);
PeerJsServer.on('connection', (client) => {
  console.log('new client connection connected', client);
});

app.use('/peerjs', PeerJsServer);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger: console } as any));

/* Handling all errors thrown */
// eslint-disable-next-line prefer-arrow-callback
app.use(function (
  err: Error | any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) {
  return sendErrorResponse(res, err.status || err.code || 500, [err]);
});

server.on('error', onError);
server.on('listening', () => {
  app
    .get('sequelizeSync')
    .then(() => {
      onListening(server);
    })
    .catch((error) => {
      Logger.error(error);
      process.exit(1);
    });
});
