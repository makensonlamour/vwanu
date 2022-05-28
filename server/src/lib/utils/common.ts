import config from 'config';
import { Response, Request, NextFunction } from 'express';

const Common = {
  getTokenFromRequest: async (request: Request) => {
    const token = request.headers['x-auth-token'];
    if (!token) return null;
    return token;
  },

  catchAsync: (fn: Function) =>
    function (req: Request, res: Response, next: NextFunction) {
      fn(req, res, next).catch((err: any) =>
        next({
          message: err.message || 'Unidentified error occurred',
          status: err.status || 500,
        })
      );
    },

  sendResponse: (
    response: Response,
    statusCode: number,
    data: any,
    message: string
  ) => {
    response.status(statusCode).json({
      status: 'ok',
      data,
      message,
    });
  },
  _formatError: (errors: Function | any) => {
    if (!Array.isArray(errors))
      throw new Error('Errors must be an array or a function');
    return errors.map((error) => ({
      // eslint-disable-next-line no-prototype-builtins
      msg: error.hasOwnProperty('message')
        ? error.message
        : 'Really confusing error',
      ...error,
    }));
  },
  sendErrorResponse: (
    response: Response,
    statusCode: number,
    errors: string | any[]
  ): void => {
    // const errorFormat = errors?.array
    //   ? errors.array()
    //   : Common._formatError(errors)

    response.status(statusCode).json({
      status: statusCode,
      errors,
    });
  },
  profileMediaOptions: [
    { name: 'postImage', maxCount: config.get<number>('maxPostImages') },
    { name: 'postVideo', maxCount: config.get<number>('maxPostVideos') },
    { name: 'postAudio', maxCount: config.get<number>('maxPostAudios') },
  ],

  getAcceptableQueryParams: (
    paramsArray: string[],
    request: Request
  ): any[] => {
    const data = request.query;

    return Object.keys(data).map((key) => {
      if (paramsArray.some((criteria) => criteria === key)) {
        return { [key]: data[key] };
      }
      return null;
    });
  },

  getQueryPagesAndSize: (
    request: Request
  ): {
    offsetAndLimit: { limit?: number; offset: number };
    getTotalPages: Function;
  } => {
    const { page, size } = request.query;

    const pageAsNumber = Number.parseInt(page as string, 10);
    const sizeAsNumber = Number.parseInt(size as string, 10);

    let pages = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) pages = pageAsNumber;

    let sizes = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < sizes)
      sizes = sizeAsNumber;

    const offsetAndLimit: { limit?: number; offset: number } = {
      offset: pages * sizes,
    };
    if (sizes > 0) offsetAndLimit.limit = sizes;
    const getTotalPages = (count: number): number => Math.ceil(count / sizes);

    return { offsetAndLimit, getTotalPages };
  },

  getUploadedFiles: (mediaArray: string[], request): any => {
    const data = request;

    const documentFiles = request.UploadedMedia;

    console.log(mediaArray);
    console.log(documentFiles);
    if (documentFiles && mediaArray.some((media) => documentFiles[media])) {
      console.log(' In ');
      // if (documentFiles?.postImage || documentFiles?.postVideo) {
      data.Media = [];

      mediaArray.forEach((mediaGroup) => {
        if (documentFiles[mediaGroup]) {
          documentFiles[mediaGroup].forEach((doc) => {
            if (doc.path)
              data.Media.push({
                original: doc.path,
                UserId: data.UserId,
              });
          });
        }
      });
    }
    delete data.UploadedMedia;
    return data;
  },
};

export default Common;
