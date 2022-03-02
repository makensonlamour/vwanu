// import multer from 'multer';
// import cloud from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET } =
  process.env;
cloudinary.config({
  api_secret: CLOUDINARY_API_SECRET,
  api_key: CLOUDINARY_API_KEY,
  cloud_name: CLOUDINARY_CLOUD_NAME,
});

const profilePictures = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg'],
    folder: 'vwanu/profile',
  },
});
const postImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg'],
    folder: 'vwanu/post',
  },
});

export const postStorage = multer({ storage: postImages });
export const profilesStorage = multer({ storage: profilePictures });
