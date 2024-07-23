// import decodeToken from '../lib/utils/decodeToken';

const userPath = '/users';
const noneAuthPaths = ['/auth', '/countries', '/states', 'cities'];

export default (app) =>
  app.use((req, res, next) => {
    if (
      userPath === req.path &&
      (req.method === 'post' || req.method === 'patch')
    )
      return next();
    // check if the service is authenticated
    if (noneAuthPaths.includes(req.path)) return next();

    // const token = req.header('x-auth-token');
    // const decoded = decodeToken(token);
    return next();
  });
