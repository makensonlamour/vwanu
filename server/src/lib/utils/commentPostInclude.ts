import db from '../../models';

export const userAttributes = ['firstName', 'lastName', 'id', 'profilePicture'];
export const include = [
  { model: db.Media },

  {
    model: db.Post,
    as: 'Comments',
    include: [{ model: db.User, attributes: userAttributes }],
  },
  {
    model: db.User,
    attributes: userAttributes,
  },
];