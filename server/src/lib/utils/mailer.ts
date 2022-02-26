import config from 'config';
import nodemailer, { SendMailOptions } from 'nodemailer';

// Custom Dependencies
import Log from './logger';

const smtp = config?.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
  logSuccess?: boolean;
}>('smtp');

const { user, pass } = smtp;
const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user, pass },
});

const sendEmail = async (payload: SendMailOptions) =>
  new Promise<void>((resolve, reject) => {
    transporter
      .sendMail(payload)
      .then((info) => {

      // save the messageId , email , time and user in database 
      
        if (smtp.logSuccess)
          Log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        resolve(info);
      })
      .catch((error) => {
        Log.error(error);
        reject(error);
      });
  });

export default sendEmail;
