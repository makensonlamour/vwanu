const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  TEST_MAIL_API_KEY: 'c5e803bf-60d0-40ff-a33c-5934451d9a64',

  TEST_MAIL_NAMESPACE: 'aslkd',
  smtp: {
    user: 'vwanuht@gmail.com',
    pass: 'password#123',
    port: 587,
    secure: true,
    service: 'gmail',
  },

  maxPostImages: 4,
  maxPostVideos: 1,
  maxPostAudios: 1,
  BASE_URL: 'http//localhost:',

  cloudinary: {
    CLOUDINARY_API_SECRET: 'IXxdEi6pkdhedAb7_adYg2OZ6A8',
    CLOUDINARY_API_KEY: '898516427283119',
    CLOUDINARY_CLOUD_NAME: 'dnesmf7ah',
  },

  SMTP_CONFIGURATION: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    email_from: process.env.SEND_EMAIL_FROM,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  },
};
