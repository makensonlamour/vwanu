import config from 'config';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { Response, Request, NextFunction } from 'express';

import common from '../../lib/utils/common';
import AppError from '../../errors';

const JWT_SECRET = config.get<string>('JWT_SECRET');

const { catchAsync } = common;
export default catchAsync(
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('x-auth-token');
      if (!token)
        throw new AppError(
          'Missing Authentication token',
          StatusCodes.BAD_REQUEST
        );

      jwt.verify(token, JWT_SECRET as jwt.Secret, (err, decoded) => {
        if (err && !decoded)
          throw new AppError(err.message, StatusCodes.UNAUTHORIZED);
        req.user = (<any>decoded).user;
        return next();
      });
    } catch (e) {
      return next({
        message: e.message || 'You sent and invalid token',
        status: e.status || StatusCodes.BAD_REQUEST,
      });
    }
  }
);
