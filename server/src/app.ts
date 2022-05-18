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
import RequestBody from './middleware/RequestBody';
import handlerRoutes from './routes/handler';

dotenv.config();
const { sendErrorResponse } = common;

// export default async function (database: any) {
//   if (!database) throw new Error('No database specified');
const app = express();
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(RequestBody);
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

//  connect to the database
// await database.sequelize.sync({ logging: false, alter: true });
// Serving the routes
handlerRoutes(app);

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

export default app;
// }
