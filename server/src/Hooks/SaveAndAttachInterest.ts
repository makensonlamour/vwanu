import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export type AttachInterest = {
  entityName: string;
  relationTableName: string;
  foreignKey: string;
};

export default (attachments: AttachInterest) => async (context: HookContext) => {
  const { data, result, app, params } = context;
  if (!data.interests || !result) return context;

  try {
    const { entityName, relationTableName, foreignKey } = attachments;
    const {
      [entityName]: entityModel,
      [relationTableName]: relationTableModel,
      User: UserModel,
      Interest: InterestModel,
    } = app.get('sequelizeClient').models;

    const interestList = await Promise.all(
      data.interests.map((name) =>
        InterestModel.findOrCreate({
          where: { name },
          defaults: {
            UserId: params.User.id,
          },
        })
      )
    );

    await Promise.all(
      interestList.map((interest) =>
        relationTableModel.findOrCreate({
          where: { [foreignKey]: result.id, InterestId: interest[0].id },
        })
      )
    );

    const entity = await entityModel.findByPk(result.id, {
      include: [
        { model: InterestModel },
        {
          model: UserModel,
          attributes: [],
        },
      ],
    });

    context.result = entity;
    return context;
  } catch (error) {
    throw new BadRequest(error);
  }
};
