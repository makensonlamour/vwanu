import { Response, NextFunction } from 'express';

export default (req: any, res: Response, next: NextFunction) => {
  const { method } = req;
  if (method === 'GET' || method === 'DELETE') return next();

  req.feathers.files = req.files;
  req.body.UploadedMedia = req.files ? req.files : null;

  return next();
};
