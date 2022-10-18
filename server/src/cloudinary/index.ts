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

const freeMedia = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg'],
    folder: 'vwanu/medias',
  },
});
const postImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'm4v'],
    folder: 'vwanu/post',
    resource_type: 'auto',
  },
});

const messageMedia = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'm4v'],
    folder: 'vwanu/messages',
    resource_type: 'auto',
  },
});
const blogImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'm4v'],
    folder: 'vwanu/blog',
    resource_type: 'auto',
  },
});

const albumImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'm4v'],
    folder: 'vwanu/album',
    resource_type: 'auto',
  },
});

export const messageStorage = multer({ storage: messageMedia });
export const postStorage = multer({ storage: postImages });
export const blogStorage = multer({ storage: blogImages });
export const profilesStorage = multer({ storage: profilePictures });
export const mediaStorage = multer({ storage: freeMedia });
export const albumStorage = multer({ storage: albumImages });
