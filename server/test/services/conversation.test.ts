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
  let randomUser3;
  let myConversations;
  const userEndpoint = '/users';
  const endpoint = '/conversation';
  // const conversationUsers = '/conversation-users';
  let publicConversation;
  let previousConversation;
  beforeAll(async () => {
    app.get('sequelizeClient').options.log = true;
    // await Message.sync({ force: true });
    // await User.sync({ force: true });
    testServer = request(app);
    // create two users
    const users = await Promise.all(
      getRandUsers(3).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
    [randomUser1, randomUser2, randomUser3] = users.map(
      (testUser) => testUser.body
    );
  });
  it.skip('registered the service', () => {
    const service = app.service('conversation');
    expect(service).toBeTruthy();
  });

  it.todo('Should not be able to create conversation if not friend');
  it.skip('Should be able to create a direct conversation', async () => {
    const response = await createConversation([randomUser2.id], randomUser1);
    previousConversation = response;
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
  it.skip('Should be able to create another conversation with a third  user', async () => {
    const response = await createConversation([randomUser3.id], randomUser1);

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

  it.skip('should not create a second conversation with the same users', async () => {
    const response = await createConversation([randomUser2.id], randomUser1);

    expect(response).toEqual(
      expect.objectContaining({
        ConversationId: previousConversation.id,
      })
    );
  });

  it.skip('Should list all conversation created or part of via the conversation endpoint', async () => {
    // The first user involve can see his conversations
    myConversations = await testServer
      .get(endpoint)
      .set('authorization', randomUser1.accessToken);

    myConversations.body.data.forEach((conversation) => {
      expect(conversation).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          amountOfMessage: 0,
          amountOfPeople: 2,
          type: 'direct',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          Users: expect.any(Array),
          lastMessage: null,
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

      expect(
        conversation.Users.some((User) => User.id === randomUser1.id)
      ).toBeTruthy();
    });

    // The second user request should see the same conversations

    const secondUserCheckingConversation = await testServer
      .get(endpoint)
      .set('authorization', randomUser2.accessToken);

    secondUserCheckingConversation.body.data.forEach((conversation) => {
      expect(conversation).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          amountOfMessage: 0,
          amountOfPeople: 2,
          type: 'direct',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          Users: expect.any(Array),
          // Messages: expect.any(Array),
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

    expect(newConversation.data.length).toBe(0);
  }, 15000);

  it.skip('should be able to fetch one conversation', async () => {
    const { body: fetchedConversation } = await testServer
      .get(`${endpoint}/${myConversations.body.data[0].id}`)
      .set('authorization', randomUser1.accessToken);

    expect(fetchedConversation).toEqual({
      id: myConversations.body.data[0].id,
      amountOfPeople: 2,
      type: 'direct',
      name: null,
      amountOfMessage: 0,
      amountOfUnreadMessages: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      Users: expect.any(Array),
      lastMessage: null,
    });

    const { Users } = fetchedConversation;
    expect(Users.length).toBe(2);
    // expect(Users.some((User) => User.id === randomUser1.id)).toBeTruthy();
    // expect(Users.some((User) => User.id === randomUser2.id)).toBeTruthy();
  });

  it.skip('Only users of a conversation should fetch it', async () => {
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
  it.skip('Should create a new message in a conversation', async () => {
    publicConversation = await createConversation(
      [randomUser2.id],
      randomUser1
    );

    const newMessage = {
      messageText: 'test message',
      ConversationId: publicConversation.ConversationId,
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
          ConversationId: publicConversation.ConversationId,
          createdAt: expect.any(String),
          receivedDate: null,
          readDate: null,
        })
      );
    });
  });
  it.skip('should be able to fetch one conversation and see last message it contains', async () => {
    console.log('\n\n\n\n PublicConversation');
    const { body, body: fetchedConversation } = await testServer
      .get(`${endpoint}/${publicConversation.ConversationId}`)
      .set('authorization', randomUser2.accessToken);

    console.log({ body });
    console.log({ fetchedConversation });
    expect(fetchedConversation).toMatchObject({
      id: publicConversation.ConversationId,
      amountOfPeople: 2,
      type: 'direct',
      name: null,
      amountOfMessage: 2,
      amountOfUnreadMessages: 2,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      Users: expect.any(Array),
      lastMessage: {
        id: expect.any(String),
        messageText: 'test message2',
        senderId: expect.any(String),
        read: false,
        received: false,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ConversationId: publicConversation.ConversationId,
        readDate: null,
        receivedDate: null,
      },
    });
    const { Users } = fetchedConversation;
    expect(Users.some((User) => User.id === randomUser1.id)).toBeTruthy();
    expect(Users.some((User) => User.id === randomUser2.id)).toBeTruthy();
  });

  it.skip('When a conversation is fetch it should tell the requester his amount of unread messages', async () => {
    let conversations = await Promise.all(
      [randomUser1.accessToken, randomUser2.accessToken].map((participant) =>
        testServer
          .get(`${endpoint}/${publicConversation.ConversationId}`)
          .set('authorization', participant)
      )
    );
    conversations = conversations.map((conversation) => conversation.body);

    // Because the messages where sent by user 1
    const [user1Conversation, user2Conversation] = conversations;
    expect(user1Conversation.amountOfUnreadMessages).toBe(0);
    expect(user2Conversation.amountOfUnreadMessages).toBe(2);
  });
  it.skip('user should fetch all message of a conversation', async () => {
    const messages = await testServer
      .get(`/message/?ConversationId=${publicConversation.ConversationId}`)
      .set('authorization', randomUser1.accessToken);

    expect(Array.isArray(messages.body)).toBeTruthy();
    expect(
      messages.body.every(
        (message) =>
          message.ConversationId === publicConversation.ConversationId
      )
    ).toBeTruthy();

    messages.body.forEach((message) => {
      expect(message).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          received: false,
          read: false,
          messageText: expect.any(String),
          ConversationId: publicConversation.ConversationId,
          createdAt: expect.any(String),
          receivedDate: null,
          readDate: null,
        })
      );
    });
  });
});
