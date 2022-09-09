import { AddAssociations } from '../../../Hooks';

const IncludeSenderAndConversation = AddAssociations({
  models: [
    {
      model: 'users',
      as: 'sender',
      attributes: [
        'firstName',
        'lastName',
        'id',
        'profilePicture',
        'createdAt',
      ],
    },
    { model: 'conversation' },
    { model: 'medias' },
  ],
});

export default IncludeSenderAndConversation;
