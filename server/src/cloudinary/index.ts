// import multer from 'multer';
// import cloud from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('config');

const configuration = config?.get('cloudinary');
const { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET } =
  configuration;

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
const blogImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg'],
    folder: 'vwanu/blog',
  },
});

const albumImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg'],
    folder: 'vwanu/album',
  },
});

export const postStorage = multer({ storage: postImages });
export const blogStorage = multer({ storage: blogImages });
export const profilesStorage = multer({ storage: profilePictures });

export const albumStorage = multer({ storage: albumImages });
