/** Local dependencies */
import {
  CLOUDINARY_CONFIG_SCHEMA,
  CLOUDINARY_CONFIG_TYPE,
} from '../schema/mediaConf.schema';

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('config');

const ALL_ALLOW_FORMAT = ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'm4v'];
const RESTRICTED_FORMAT = ['jpg', 'png', 'jpeg'];

const configuration: CLOUDINARY_CONFIG_TYPE = config.get(
  'CLOUDINARY_CONFIGURATION'
);

if (CLOUDINARY_CONFIG_SCHEMA.parse(configuration))
  cloudinary.config(configuration);

const profilePictures = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: RESTRICTED_FORMAT,
    folder: 'vwanu/profile',
    resource_type: 'auto',
  },
});

const freeMedia = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: RESTRICTED_FORMAT,
    folder: 'vwanu/medias',
    resource_type: 'auto',
  },
});
const postImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ALL_ALLOW_FORMAT,
    folder: 'vwanu/post',
    resource_type: 'auto',
  },
});

const discussionImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ALL_ALLOW_FORMAT,
    folder: 'vwanu/post',
    resource_type: 'auto',
  },
});

const messageMedia = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ALL_ALLOW_FORMAT,
    folder: 'vwanu/messages',
    resource_type: 'auto',
  },
});
const blogImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ALL_ALLOW_FORMAT,
    folder: 'vwanu/blog',
    resource_type: 'auto',
  },
});

const albumImages = new CloudinaryStorage({
  cloudinary,
  params: {
    allowedFormats: ALL_ALLOW_FORMAT,
    folder: 'vwanu/album',
    resource_type: 'auto',
  },
});

export const messageStorage = multer({ storage: messageMedia });
export const postStorage = multer({ storage: postImages });
export const discussionStorage = multer({ storage: discussionImages });
export const blogStorage = multer({ storage: blogImages });
export const profilesStorage = multer({ storage: profilePictures });
export const mediaStorage = multer({ storage: freeMedia });
export const albumStorage = multer({ storage: albumImages });
