import { Server } from 'http';
import Logger from '../lib/utils/logger';

export default {
  onListening(server: Server, host?: string) {
    const addr = server.address();
    const bind: string | null =
      typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr?.port}`;
    let message = `Listening on ${bind}`;
    if (host) message += ` from host ${host}`;
    Logger.info(message);
  },
  onError(error: any, port: number | string): void {
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
  },
  normalizePort(val: string | number): number | string | null {
    let port = val;
    if (typeof port === 'string') port = parseInt(port, 10);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return null;
  },

  // function (
  //   err: Error | any,
  //   req: Request,
  //   res: Response,
  //   // eslint-disable-next-line no-unused-vars
  //   next: NextFunction
  // ) {
  //   return sendErrorResponse(res, err.status || err.code || 500, [err]);
  // }
};
