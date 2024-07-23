import { Application } from '../declarations';
import mostBeActiveMiddleware from './mostBeActive.middleware';

// eslint-disable-next-line no-unused-vars
export default function (app: Application): void {
//   console.log('Middleware ran');
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  // check what path is being requested
  //   app.use((req, res, next) => {
  //     console.log('Time:', Date.now());
  //     console.log('Request Type:', req.method);
  //     console.log('Request URL:', req.originalUrl);
  //     console.log('Request IP:', req.ip);
  //     console.log('Request Headers:', req.path);
  //     next();
  //   });
  app.configure(mostBeActiveMiddleware);
}
