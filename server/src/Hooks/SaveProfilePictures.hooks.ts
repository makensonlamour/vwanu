/* eslint-disable prefer-destructuring */
import { HookContext } from '@feathersjs/feathers';

export default (mediaArray: string[]) =>
  async (context: HookContext): Promise<HookContext> => {
    if (!mediaArray) throw new Error('Please specify mediaArrays');
    const documentFiles = context.data.UploadedMedia;
    if (!documentFiles) return context;

    mediaArray.forEach((mediaGroup) => {
      if (documentFiles[mediaGroup]) {
        context.data[mediaGroup] = documentFiles[mediaGroup][0].path;
      }
    });

    return context;
  };
