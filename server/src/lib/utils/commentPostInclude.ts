import db from '../../models';

export const userAttributes = ['firstName', 'lastName', 'id', 'profilePicture'];

export const ReactionInclude = [{ model: db.User, attributes: userAttributes }];
export const include = [
  { model: db.Media },

  {
    model: db.Post,
    as: 'Comments',
    include: [
      { model: db.User, attributes: userAttributes },
      {
        model: db.Reaction,
        include: ReactionInclude,
      },
    ],
    order: [['createdAt', 'ASC']],
  },
  {
    model: db.User,
    attributes: userAttributes,
  },
  {
    model: db.Reaction,
    include: [{ model: db.User, attributes: userAttributes }],
  },
];
