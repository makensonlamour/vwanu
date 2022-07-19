/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'blogResponse ' service", () => {
  let testServer;
  let testUsers;
  let blog;
  let resp;
  let blogCreator;
  const userEndpoint = '/users';
  const blogEndpoint = '/blogs';
  const endpoint = '/blogResponse';

  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ force: true, logged: false });
    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(3).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );

    testUsers = testUsers.map((testUser) => testUser.body);
    blogCreator = testUsers.shift();

    blog = await testServer
      .post(blogEndpoint)
      .send({
        blogTitle: 'Title ew',
        blogText: '<strong>Body text</strong><img src=x/>',
        interests: ['some', 'category'],
      })
      .set('authorization', blogCreator.accessToken);

    blog = blog.body;
  }, 100000);

  it('registered the service', () => {
    const service = app.service('blogResponse');
    expect(service).toBeTruthy();
  });

  it('any user can create a response on a blog', async () => {
    const responseText = 'I love your blog';
    resp = await testServer
      .post(endpoint)
      .send({
        BlogId: blog.id,
        responseText,
      })
      .set('authorization', testUsers[0].accessToken);
    resp = resp.body;
    expect(resp).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        banned: false,
        BlogId: expect.any(String),
        responseText,
        UserId: testUsers[0].id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        bannedReason: null,
        bannedBy: null,
        BlogResponseId: null,
      })
    );
  });
  it('Only a response creator can edit a response', async () => {
    const responseText = 'I have a new opinion';
    let responses = await Promise.all(
      [blogCreator, testUsers[0]].map((user) =>
        testServer
          .patch(`${endpoint}/${resp.id}`)
          .send({
            responseText,
          })
          .set('authorization', user.accessToken)
      )
    );

    responses = responses.map((response) => response.body);

    expect(responses[0]).toEqual(
      expect.objectContaining({
        name: 'BadRequest',
        message: 'Not authorized',
        code: 400,
        className: 'bad-request',
        errors: {},
      })
    );

    expect(responses[1]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        responseText,
        banned: false,
        bannedReason: null,
        bannedBy: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        BlogId: blog.id,
        UserId: testUsers[0].id,
        BlogResponseId: null,
        User: {
          firstName: testUsers[0].firstName,
          lastName: testUsers[0].lastName,
          id: testUsers[0].id,
          profilePicture: expect.any(String),
          createdAt: expect.any(String),
        },
      })
    );
  });

  it('User fetch all response base on blog id', async () => {
    const user0 = testUsers[0];
    let responses = await testServer
      .get(`${endpoint}?BlogId=${blog.id}`)
      .set('authorization', user0.accessToken);

    responses = responses.body;
    expect(responses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          responseText: expect.any(String),
          banned: false,
          bannedReason: null,
          bannedBy: null,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          BlogId: expect.any(String),
          UserId: expect.any(Number),
          BlogResponseId: null,
          User: {
            firstName: expect.any(String),
            lastName: expect.any(String),
            id: expect.any(Number),
            profilePicture: expect.any(String),
            createdAt: expect.any(String),
          },
        }),
      ])
    );
  });

  it('Only a response creator can delete a response', async () => {
    const responseText = 'I have a new opinion';
    let responses = await Promise.all(
      [blogCreator, testUsers[0]].map((user) =>
        testServer
          .delete(`${endpoint}/${resp.id}`)
          .set('authorization', user.accessToken)
      )
    );

    responses = responses.map((response) => response.body);

    expect(responses[0]).toEqual(
      expect.objectContaining({
        name: 'BadRequest',
        message: 'Not authorized',
        code: 400,
        className: 'bad-request',
        errors: {},
      })
    );

    expect(responses[1]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        responseText,
        banned: false,
        bannedReason: null,
        bannedBy: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        BlogId: blog.id,
        UserId: testUsers[0].id,
        BlogResponseId: null,
        User: {
          firstName: testUsers[0].firstName,
          lastName: testUsers[0].lastName,
          id: testUsers[0].id,
          profilePicture: expect.any(String),
          createdAt: expect.any(String),
        },
      })
    );
  });
});
