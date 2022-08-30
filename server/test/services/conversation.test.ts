/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../../src/app';

import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

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
        amountOfPeople: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        type: 'direct',
      })
    );
  });
  it('Should be able to list all conversation created or part of', async () => {
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
    myConversations = await testServer
      .get(endpoint)
      .set('authorization', randomUser1.accessToken);

    console.log(myConversations.body);
    myConversations.body.forEach((conversation) => {
      expect(conversation).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          amountOfMessages: expect.any(Number),
          amountOfPeople: expect.any(Number),
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

  it('should be able to fetch one conversation', async () => {
    const fetchedConv = await testServer
      .get(`${endpoint}/${myConversations.body[0].id}`)
      .set('authorization', randomUser1.accessToken);

    console.log('Here is the conversation fetched');
    console.log(fetchedConv.body);
    expect(fetchedConv.body).toEqual({
      id: expect.any(String),
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
    const pulled = await testServer
      .get(`${conversationUsers}/?ConversationId=${publicConversation.id}`)
      .set('authorization', randomUser1.accessToken);

    pulled.body.forEach((conversation) => {
      expect(conversation).toMatchObject({
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
            messageText: 'test message1',
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
      expect(
        conversation.Users.some((User) => User.id === randomUser1.id)
      ).toBeTruthy();
    });
  });

  it('user should fetch all message of a conversation', async () => {
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
