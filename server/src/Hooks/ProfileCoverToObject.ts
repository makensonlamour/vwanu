import { HookContext } from '@feathersjs/feathers';
import UrlToMedia from '../lib/utils/UrlToMedia';

export default (fields: string[]) =>
  (context: HookContext): HookContext => {
    // console.log('In there');
    // const dataToChange = Array.isArray(context.result)
    //   ? context.result
    //   : context.result.data;
    //   console.log(context.result);
    // console.log(Array.isArray(context.result));
    if (context.result.data)
      context.result.data?.forEach((entity, idx) => {
        fields.forEach((field) => {
          if (entity[field]) {
            context.result.data[idx][field] = UrlToMedia(entity[field]);
          }
        });
      });
    else if (Array.isArray(context.result))
      context.result?.forEach((entity, idx) => {
        fields.forEach((field) => {
          if (entity[field]) {
            context.result[idx][field] = UrlToMedia(entity[field]);
          }
        });
      });
    else
      fields.forEach((field) => {
        if (context.result[field]) {
          context.result[field] = UrlToMedia(context.result[field]);
        }
      });

    return context;
  };
