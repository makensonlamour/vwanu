/* eslint-disable no-unused-vars */
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import methodOverride from 'method-override';
import configuration from '@feathersjs/configuration';
import { Request, Response, NextFunction } from 'express';
import feathers, {
  HookContext as FeathersHookContext,
} from '@feathersjs/feathers';

/** Custom dependencies */
import channels from './channels';
import database from './database';
import services from './services';
import sequelize from './sequelize';
import middleware from './middleware';
import common from './lib/utils/common';
import { Application } from './declarations';
import authentication from './authentication';
import RequestBody from './middleware/RequestBody';

dotenv.config();
const { sendErrorResponse } = common;

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
app.configure(channels);
app.configure(database);
app.get('startSequelize')();
app.configure(services);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger: console } as any));

/* Handling all errors thrown */
// eslint-disable-next-line prefer-arrow-callback
app.use(function (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return sendErrorResponse(res, err.status || err.code || 500, [err]);
});
export type HookContext<T = any> = {
  app: Application;
} & FeathersHookContext<T>;
export default app;
