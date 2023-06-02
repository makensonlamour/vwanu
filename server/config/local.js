const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  TEST_MAIL_API_KEY: 'TEST_MAIL_API_KEY',
  TEST_MAIL_NAMESPACE: 'TEST_MAIL_NAMESPACE',

  maxPostImages: 4,
  maxPostVideos: 1,
  maxPostAudios: 1,
  BASE_URL: 'http//localhost:',

  cloudinary: {
    CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
    CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
    CLOUDINARY_CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
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
  dbSettings: {
    username: 'DB_USER',
    password: 'DB_PASSWORD',
    database: 'DB_DATABASE',
    host: 'localhost',
  },
  CLOUDINARY_CONFIGURATION: {
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  },
};
