/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../../src/app';

import {
  getRandUser,
  getRandUsers,
} from '../../src/lib/utils/generateFakeUser';

const createConversation = async (
  userIds: string[],
  sender: any
): Promise<any> => {
  const response = await request(app)
    .post('/conversation')
    .set('Authorization', `Bearer ${sender.accessToken}`)
    .send({
      userIds,
    });
  return response.body;
};

describe("'conversation' service", () => {
  let testServer;
  let randomUser1;
  let randomUser2;
  let myConversations;
  const userEndpoint = '/users';
  const endpoint = '/conversation';
  const conversationUsers = '/conversation-users';
  let publicConversation;
  beforeAll(async () => {
    testServer = request(app);
    // create two users
    const users = await Promise.all(
      getRandUsers(2).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
    [randomUser1, randomUser2] = users.map((testUser) => testUser.body);
  });
  it('registered the service', () => {
    const service = app.service('conversation');
    expect(service).toBeTruthy();
  });

  it.todo('Should not be able to create conversation if not friend');
  it('Should be able to create a direct conversation', async () => {
    const response = await createConversation([randomUser2.id], randomUser1);

    expect(response).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        amountOfMessages: 0,
        amountOfPeople: 2,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        type: 'direct',
      })
    );
  });
  it.skip('Should be able to list all conversation created or part of', async () => {
    const list = await testServer
      .get(`${conversationUsers}/?UserId=${randomUser1.id}`)
      .set('authorization', randomUser1.accessToken);

    // console.log(list.body);
    list.body.forEach((conversation) => {
      expect(conversation).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          amountOfMessages: expect.any(Number),
          amountOfPeople: 2,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          Users: expect.any(Array),
        })
      );
      expect(
        conversation.Users.some((User) => User.id === randomUser1.id)
      ).toBeTruthy();
    });
  });

  it('Should list all conversation created or part of via the conversation endpoint', async () => {
    // The first user involve can see his conversations
    myConversations = await testServer
      .get(endpoint)
      .set('authorization', randomUser1.accessToken);

    myConversations.body.forEach((conversation) => {
      expect(conversation).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          amountOfMessages: 0,
          amountOfPeople: 2,
          type: 'direct',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          Users: expect.any(Array),
          Messages: expect.any(Array),
        })
      );

      conversation.Users.forEach((user) => {
        expect(user).toEqual(
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            profilePicture: expect.any(String),
          })
        );
      });
      expect(conversation.Messages.length).toBe(0);

      expect(
        conversation.Users.some((User) => User.id === randomUser1.id)
      ).toBeTruthy();
      expect(
        conversation.Users.some((User) => User.id === randomUser2.id)
      ).toBeTruthy();
    });

    // The second user request should see the same conversations

    const secondUserCheckingConversation = await testServer
      .get(endpoint)
      .set('authorization', randomUser2.accessToken);

    secondUserCheckingConversation.body.forEach((conversation) => {
      expect(conversation).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          amountOfMessages: 0,
          amountOfPeople: 2,
          type: 'direct',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          Users: expect.any(Array),
          Messages: expect.any(Array),
        })
      );

      conversation.Users.forEach((user) => {
        expect(user).toEqual(
          expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            profilePicture: expect.any(String),
          })
        );
      });
      expect(conversation.Messages.length).toBe(0);

      expect(
        conversation.Users.some((User) => User.id === randomUser1.id)
      ).toBeTruthy();
      expect(
        conversation.Users.some((User) => User.id === randomUser2.id)
      ).toBeTruthy();
    });

    // This user will have no conversations at all
    const newUserObject = getRandUser();
    delete newUserObject.id;

    const { body: newUser } = await testServer
      .post(userEndpoint)
      .send(newUserObject);

    const { body: newConversation } = await testServer
      .get(endpoint)
      .set('authorization', newUser.accessToken);
    // This user have not created any conversation
    expect(newConversation.length).toBe(0);
  }, 15000);

  it('should be able to fetch one conversation', async () => {
    const { body: fetchedConversation } = await testServer
      .get(`${endpoint}/${myConversations.body[0].id}`)
      .set('authorization', randomUser1.accessToken);

    expect(fetchedConversation).toEqual({
      id: myConversations.body[0].id,
      amountOfPeople: 2,
      type: 'direct',
      name: null,
      amountOfMessages: 0,
      amountOfUnreadMessages: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      Users: expect.any(Array),
      Messages: expect.any(Array),
    });

    const { Users } = fetchedConversation;
    expect(Users.length).toBe(2);
    expect(Users.some((User) => User.id === randomUser1.id)).toBeTruthy();
    expect(Users.some((User) => User.id === randomUser2.id)).toBeTruthy();
  });

  it('Only users of a conversation should fetch it', async () => {
    const newUserObject = getRandUser();
    delete newUserObject.id;
    const { body: newUser } = await testServer
      .post(userEndpoint)
      .send(newUserObject);

    const some1ElseConversation = await testServer
      .get(`${endpoint}/${myConversations.body[0].id}`)
      .set('authorization', newUser.accessToken);

    expect(some1ElseConversation.status).toBe(400);
    let ourConversation = await Promise.all(
      [randomUser1.accessToken, randomUser2.accessToken].map((participant) =>
        testServer
          .get(`${endpoint}/${myConversations.body[0].id}`)
          .set('authorization', participant)
      )
    );

    ourConversation.forEach((conversation) => {
      expect(conversation.status).toBe(200);
    });
    ourConversation = ourConversation.map((conversation) => conversation.body);

    ourConversation.forEach((conversation) => {
      expect(conversation.id).toBeDefined();
    });
  });
  it('Should create a new message in a conversation', async () => {
    publicConversation = await createConversation(
      [randomUser2.id],
      randomUser1
    );

    const newMessage = {
      messageText: 'test message',
      ConversationId: publicConversation.id,
    };

    const response: any = await Promise.all(
      [1, 2].map((msg) =>
        testServer
          .post('/message')
          .send({ ...newMessage, messageText: newMessage.messageText + msg })
          .set('authorization', randomUser1.accessToken)
      )
    );

    response.forEach(({ body: message }, idx) => {
      expect(message).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          received: false,
          read: false,
          messageText: `test message${idx + 1}`,
          ConversationId: publicConversation.id,
          createdAt: expect.any(String),
          receivedDate: null,
          readDate: null,
        })
      );
    });
  });
  it('should be able to fetch one conversation and see last message it contains', async () => {
    const { body: fetchedConversation } = await testServer
      .get(`${endpoint}/${publicConversation.id}`)
      .set('authorization', randomUser1.accessToken);

    expect(fetchedConversation).toMatchObject({
      id: publicConversation.id,
      amountOfPeople: 2,
      type: 'direct',
      name: null,
      amountOfMessages: 2,
      amountOfUnreadMessages: 2,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      Users: expect.any(Array),
      Messages: [
        {
          id: expect.any(String),
          messageText: 'test message2',
          received: false,
          read: false,
          receivedDate: null,
          readDate: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          UserId: null,
          senderId: randomUser1.id,
          ConversationId: publicConversation.id,
          sender: {
            id: randomUser1.id,
            firstName: randomUser1.firstName,
            lastName: randomUser1.lastName,
            profilePicture: expect.any(String),
          },
        },
      ],
    });
    const { Users } = fetchedConversation;
    expect(Users.some((User) => User.id === randomUser1.id)).toBeTruthy();
    expect(Users.some((User) => User.id === randomUser2.id)).toBeTruthy();
  });

  it.skip('user should fetch all message of a conversation', async () => {
    const messages = await testServer
      .get(`/message/?ConversationId=${publicConversation.id}`)
      .set('authorization', randomUser1.accessToken);

    expect(Array.isArray(messages.body)).toBeTruthy();
    expect(
      messages.body.every(
        (message) => message.ConversationId === publicConversation.id
      )
    ).toBeTruthy();

    messages.body.forEach((message) => {
      expect(message).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          received: false,
          read: false,
          messageText: expect.any(String),
          ConversationId: publicConversation.id,
          createdAt: expect.any(String),
          receivedDate: null,
          readDate: null,
        })
      );
    });
  });
});
