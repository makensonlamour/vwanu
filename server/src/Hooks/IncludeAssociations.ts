import { HookContext } from '@feathersjs/feathers';
import { merge } from 'lodash';

type Assoc = {
  association?: any;
  attributes?: any[];
  include?: any[];
  model?: any;
  as?: any;
};

const associateModels = (include, context) => {
  const associations = [];

  (Array.isArray(include) ? include : [include]).forEach((assoc: any) => {
    const { as: associate, model, include: subInclude, ...rest } = assoc;
    if (associate === 'Reaction')
      console.log(context.app.service(model).Model.associations);

    if (associate in context.app.service(model).Model.associations) {
      const association: Assoc = {
        association: context.app.service(assoc.model).Model.associations[
          associate
        ],
        ...rest,
      };
      if (subInclude)
        association.include = associateModels(subInclude, context);

      associations.push(association);
    } else
      throw new Error(
        `Requested association '${assoc.as}' of model ${
          context.app.service(model).Model.name
        } doesn't exist. Available associations are: ${
          context.app.service(model).Model.associations
        }`
      );
  });
  return associations;
};

export default (options): any =>
  async (context: HookContext) => {
    if (!options.include) throw new Error(`Include is not defined`);

    try {
      const include: any = associateModels(options.include, context);

      if (include) {
        context.params.sequelize = merge(context.params.sequelize, {
          include,
          raw: false,
        });
        // console.log(context.params.sequelize);
      }
      return context;
    } catch (err) {
      throw new Error(err);
    }
  };
