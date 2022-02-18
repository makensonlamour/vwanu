import { createServer } from 'http';

// Custom dependencies
import app from '../app';
import database from '../models';
import Logger from '../lib/utils/logger';

//  * Normalize a port into a number, string, or false.
function normalizePort(val: string): number | string | null {
  const port = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return null;
}



function onListening(server) {
  return (): void => {
    const addr = server.address();
    const bind: string | null =
      typeof addr === 'string' ? `pipe  ${addr}` : `port  ${addr?.port}`;
    Logger.info(`Listening on ${bind} `);
  };
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
      throw error;
  }
}
app(database).then((expressServer) => {
  // Passing starting database and server.
  const server = createServer(expressServer);
  try {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening(server));
  } catch (err: any) {
    Logger.error(err);
    process.exit(1);
  }
});
