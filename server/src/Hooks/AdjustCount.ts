import { HookContext } from '@feathersjs/feathers';

export type ADJUST_COUNT_OPTION = {
  model: string;
  field: string;
  key: string;
  incremental?: number;
};
export default (options: ADJUST_COUNT_OPTION) =>
  async (context: HookContext) => {
    if (!context.result) return context;

    const { model, field, key, incremental } = options;
    if (!model || !field || !key) throw new Error('missing arguments');

    const { method, app } = context;

    const id = context.result[key];

    const Model = app.get('sequelizeClient').models[model];

    switch (method) {
      case 'remove':
        await Model.decrement({ [field]: incremental || 1 }, { where: { id } });
        break;

      case 'create':
        await Model.increment({ [field]: incremental || 1 }, { where: { id } });
        break;

      default:
        break;
    }

    return context;
  };
