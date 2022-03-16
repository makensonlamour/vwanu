import { Request } from 'express';

export interface MulterRequest extends Request {
  files: any;
}

export const b = 1;
