import { IncludeAssociations } from '../../../Hooks';

const includeUsersAndLastMessage = IncludeAssociations({
  include: [
    {
      model: 'conversation',
      as: 'Users',
      attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
    },
    {
      model: 'conversation',
      as: 'Messages',
      order: [['createdAt', 'desc']],

      limit: 1,
      include: [
        {
          model: 'message',
          as: 'sender',
          attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
        },
      ],
    },
  ],
});

export default includeUsersAndLastMessage;
