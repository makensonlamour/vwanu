// import config from 'config';
import nodemailer, { SendMailOptions } from 'nodemailer';
import Log from './logger';

// const smtp = config?.get<{
//   user: string;
//   pass: string;
//   host: string;
//   port: number;
//   secure: boolean;
// }>('smtp')  

const smtp ={
  user: 'mzghhfqe244g3ssi@ethereal.email',
  pass: 'VGwXCd8dr3xZDNTXuZ',
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
};

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      Log.error('Error sending email');
      return;
    }

    Log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
