import { HookContext } from '@feathersjs/feathers';

const UserAttributes = [
  'firstName',
  'lastName',
  'id',
  'profilePicture',
  'createdAt',
];
export default async (context: HookContext) => {
  const { data, result, app, params } = context;
  if (!data.interests) return context;
  const {
    Interest: InterestModel,
    Blog_Interest: BlogInterestTable,
    Blog: BlogModel,
    User: UserModel,
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
      BlogInterestTable.findOrCreate({
        where: { BlogId: result.id, InterestId: interest[0].id },
      })
    )
  );

  const blog = await BlogModel.findByPk(result.id, {
    include: [
      { model: InterestModel },
      {
        model: UserModel,
        attributes: UserAttributes,
      },
    ],
  });
  context.result = blog;
  return context;
};
