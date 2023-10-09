import { Id } from '@feathersjs/feathers';
import fs from 'fs';
import path from 'path';

const canUserDoQuery = fs.readFileSync(
  path.join(__dirname, '../sql', 'canuserdo.sql'),
  'utf8'
);
export default (
  userId: Id,
  field:
    | 'canInvite'
    | 'canInPost'
    | 'canInUploadDoc'
    | 'canInUploadPhotos'
    | 'canInUploadVideo'
    | 'canMessageInGroup'
) =>
  canUserDoQuery
    .replace(/:field/g, field as string)
    .replace(/:userId/g, userId as string);
