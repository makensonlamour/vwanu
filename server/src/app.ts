/* eslint-disable no-unused-vars */
// Dependencies
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import methodOverride from 'method-override';

// Customs to
import './passport';
import common from './lib/utils/common';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import profileRoute from './routes/profile';
import postRoute from './routes/post';
import commentRoute from './routes/Comments';
import RequestBody from './middleware/RequestBody';

dotenv.config();
const { sendErrorResponse } = common;

export default async function (database: any) {
  if (!database) throw new Error('No database specified');
  const app = express();
  app.use(express.json());

  app.use(cors());
  app.use(helmet());
  app.use(RequestBody);
  app.use(morgan('dev'));
  app.use(methodOverride('_method'));
  app.use(express.urlencoded({ extended: true }));

  //  connect to the database
  await database.sequelize.sync({ logging: false, alter: true });
  // Serving the routes
  app.use('/api/auth', authRoute);
  app.use('/api/user', userRoute);
  app.use('/api/post', postRoute);
  app.use('/api/profile', profileRoute);
  app.use('/api/comment', commentRoute);

  /* Handling all errors thrown */
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line prefer-arrow-callback
  app.use(function (
    err: Error | any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { status = 500 } = err;
    return sendErrorResponse(res, status, [err]);
  });

  return app;
}
