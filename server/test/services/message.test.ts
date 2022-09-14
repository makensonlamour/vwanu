/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
/** #region customs dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';
/** #endregion */
describe("'message' service", () => {
  /** #region global variables */
  let testUsers;
  let testServer;
  let testMessages;
  let testConversation;
  let pulledMessage;
  const userEndpoint = '/users';
  const endpoint = '/message';
  const conversationsEndpoint = '/conversation';
  /** #endregion */
  /** #region before and after Each functions */
  beforeAll(async () => {
    const { Message, User, Conversation, Conversation_Users } =
      app.get('sequelizeClient').models;

    await app.get('sequelizeClient').sync({ logged: false });

    await Message.sync({ force: true });
    await User.sync({ force: true });
    await Conversation.sync({ force: true });
    // eslint-disable-next-line camelcase
    await Conversation_Users.sync({ force: true });

    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(2).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
    testUsers = testUsers.map((testUser) => testUser.body);

    const conversationStarter = testUsers[0];
    testConversation = await testServer
      .post(conversationsEndpoint)
      .send({ userIds: [testUsers[1].id] })
      .set('authorization', conversationStarter.accessToken);
    testConversation = testConversation.body;
  });
  afterAll(async () => {});
  /** #endregion */
  /** #region tests */
  it('registered the service', () => {
    const service = app.service('message');
    expect(service).toBeTruthy();
  });

  it('a user should be able to create a message in a conversation', async () => {
    testMessages = await testServer
      .post(endpoint)
      .send({
        ConversationId: testConversation.id,
        messageText: 'test',
      })
      .set('authorization', testUsers[0].accessToken);
    testMessages = testMessages.body;

    expect(testMessages).toMatchObject({
      id: expect.any(String),
      received: false,
      read: false,
      ConversationId: expect.any(String),
      messageText: 'test',
      senderId: testUsers[0].id,
      Media: [],
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      receivedDate: null,
      readDate: null,
      UserId: null,
    });
  });

  it('a user should be able pull a particular message', async () => {
    pulledMessage = await testServer
      .get(`${endpoint}/${testMessages.id}`)
      .set('authorization', testUsers[0].accessToken);

    pulledMessage = pulledMessage.body;
    expect(pulledMessage).toMatchObject({
      id: testMessages.id,
      messageText: 'test',
      received: false,
      read: false,
      receivedDate: null,
      readDate: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      UserId: null,
      senderId: testUsers[0].id,
      ConversationId: testConversation.id,
      sender: expect.objectContaining({
        firstName: testUsers[0].firstName,
        lastName: testUsers[0].lastName,
        id: testUsers[0].id,
        profilePicture: expect.any(String),
        createdAt: expect.any(String),
      }),
      Conversation: expect.objectContaining({
        id: testConversation.id,
        amountOfPeople: 2,
        type: 'direct',
        name: null,
        amountOfMessages: 1,
        amountOfUnreadMessages: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
      Media: [],
    });
  }, 10000);

  it.todo('should be able to send media in a conversation');
  it('Should Mark Message as read, received, receivedDate, readDate are automatically set', async () => {
    await testServer
      .patch(`${endpoint}/${testMessages.id}`)
      .send({ read: true })
      .set('authorization', testUsers[1].accessToken);

    let pulledUpdatedConversation = await testServer
      .get(`${endpoint}/${testMessages.id}`)
      .set('authorization', testUsers[1].accessToken);
    pulledUpdatedConversation = pulledUpdatedConversation.body;

    expect(pulledUpdatedConversation).toMatchObject({
      id: testMessages.id,
      messageText: 'test',
      received: true,
      read: true,
      receivedDate: expect.any(String),
      readDate: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      UserId: null,
      senderId: testUsers[0].id,
      ConversationId: testConversation.id,
      sender: {
        firstName: testUsers[0].firstName,
        lastName: testUsers[0].lastName,
        id: testUsers[0].id,
        profilePicture: expect.any(String),
        createdAt: expect.any(String),
      },
      Conversation: {
        id: testConversation.id,
        amountOfPeople: 2,
        type: 'direct',
        name: null,
        amountOfMessages: 1,
        amountOfUnreadMessages: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });
  it.todo('should be able to mark a conversation as read or received');
  /** #endregion */
});
