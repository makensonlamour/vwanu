/* eslint-disable camelcase */
import isNill from 'lodash/isNil';
import { HookContext } from '@feathersjs/feathers';

/** Local dependencies */
import Logger from '../../../lib/utils/logger';
/**
 * This hook attaches the discussion to the category it belongs to. through discussion interest
 * @param {HookContext} context - context passed by the hook
 */
export default async (context: HookContext): Promise<HookContext> => {
  const { app, data, result } = context;
  if (isNill(data.CategoryId)) return context;
  try {
    const { Discussion_ForumCategory } = app.get('sequelizeClient').models;
    await Discussion_ForumCategory.findOrCreate({
      where: { DiscussionId: result?.id, ForumCategoryId: data.CategoryId },
    });
  } catch (e) {
    Logger.log(e);
  }
  return context;
};
