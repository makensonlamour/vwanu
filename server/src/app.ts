/* eslint-disable no-unused-vars */
// Dependencies
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import methodOverride from 'method-override';
import feathers, {
  HookContext as FeathersHookContext,
} from '@feathersjs/feathers';
import { Request, Response, NextFunction } from 'express';
import configuration from '@feathersjs/configuration';
import sequelize from './sequelize';

// Customs to
import './passport';
import common from './lib/utils/common';
import authRoute from './routes/auth';
import userRoute from './routes/user/user.routes';
import profileRoute from './routes/profile';
import postRoute from './routes/post';
import commentRoute from './routes/Comments';
import { Application } from './declarations';
import reactionRoute from './routes/reaction/reaction.routes';
import RequestBody from './middleware/RequestBody';
import middleware from './middleware';
import authentication from './authentication';
import services from './services';
import channels from './channels';

dotenv.config();
const { sendErrorResponse } = common;

export default async function (database: any) {
  if (!database) throw new Error('No database specified');

  const app: Application = express(feathers());
  app.configure(configuration());
  app.use(express.json());

  app.use(cors());
  app.use(helmet());
  app.use(RequestBody);
  app.use(morgan('dev'));
  app.use(methodOverride('_method'));
  app.use(express.urlencoded({ extended: true }));

  app.configure(express.rest());
  app.configure(socketio());
  app.configure(sequelize);

  app.configure(middleware);
  app.configure(authentication);
  // Set up our services (see `services/index.ts`)
  app.configure(services);
  // Set up event channels (see channels.ts)
  app.configure(channels);
  //  connect to the database
  //  await database.sequelize.sync({ logging: false, alter: true });
  // Serving the routes
  app.use('/api/auth', authRoute);
  app.use('/api/user', userRoute);
  app.use('/api/post', postRoute);
  app.use('/api/profile', profileRoute);
  app.use('/api/comment', commentRoute);
  app.use('/api/reaction', reactionRoute);

  /* Handling all errors thrown */
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line prefer-arrow-callback
  app.use(function (
    err: Error | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { status = 500 } = err;
    return sendErrorResponse(res, status, [err]);
  });
  // export type HookContext<T = any> = {
  //   app: Application;
  // } & FeathersHookContext<T>;
  return app;
}
