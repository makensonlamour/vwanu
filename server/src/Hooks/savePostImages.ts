/* eslint-disable prefer-destructuring */
import { HookContext } from '@feathersjs/feathers';

export default (mediaArray: string[]) =>
  async (context: HookContext): Promise<HookContext> => {
    if (!mediaArray) throw new Error('Please specify mediaArrays');

    // const documentFiles = context.data.UploadedMedia;

    // console.log('we have doc files ');
    // console.log(documentFiles);
    // console.log('the data');
    // console.log(context.data);
    // console.log('result');
    // console.log(context.result);

    // const { id, Userid } = context.result;
    // context.app.service('medias').create({ UserId, PostId:})

    // if (!documentFiles) return context;

    // mediaArray.forEach((mediaGroup) => {
    //   if (documentFiles[mediaGroup]) {
    //     context.data[mediaGroup] = documentFiles[mediaGroup][0].path;
    //   }
    // });

    return context;
  };
