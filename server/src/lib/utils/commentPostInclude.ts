export const userAttributes = ['firstName', 'lastName', 'id', 'profilePicture'];

// export const ReactionInclude = (app) => [
//   { model: app.get('sequelizeClient').models.User, attributes: userAttributes },
// ];

export const include = (app) => [
  {
    model: app.get('sequelizeClient').models.Media,
  },

  {
    model: app.get('sequelizeClient').models.User,
    attributes: userAttributes,
  },
  {
    model: app.get('sequelizeClient').models.Post,
    as: 'Comments',
    attributes: ['id', 'posText', 'PostId', 'createdAt', 'updatedAt'],
    include: [
      {
        model: app.get('sequelizeClient').models.User,
        attributes: userAttributes,
      },
      // {
      //   model: app.get('sequelizeClient').models.Reaction,
      //   include: ReactionInclude,
      // },
    ],
    order: [['createdAt', 'ASC']],
  },
  {
    model: app.get('sequelizeClient').models.User,
    attributes: userAttributes,
  },
  // {
  //   model: app.get('sequelizeClient').models.Reaction,
  //   include: [
  //     {
  //       model: app.get('sequelizeClient').models.User,
  //       attributes: userAttributes,
  //     },
  //   ],
  // },
];
