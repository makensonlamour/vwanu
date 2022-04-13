/* eslint-disable no-unused-vars */
declare namespace Express {
  interface Request {
    token: string;
    files: any;
    file: any;
    user: { id: string };
  }
}
