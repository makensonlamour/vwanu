import { Id } from '@feathersjs/feathers';
import canUserDoQuery from '../sql/canuserdo.sql';


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
