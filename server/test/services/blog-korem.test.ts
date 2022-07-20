/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'BlogKorem' service", () => {
  let testServer;
  let testUsers;
  let blogs;
  const endpoint = '/blogs';
  const userEndpoint = '/users';
  const blogKoremEndpoint = '/blogKorem';

  beforeAll(async () => {
    const sequelize = app.get('sequelizeClient');
    sequelize.options.logging = false;
    await sequelize.sync({ force: true, logged: false });
    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(2).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );

    blogs = await Promise.all(
      testUsers.map(({ body }) =>
        testServer
          .post(endpoint)
          .send({
            blogTitle: 'Title ew',
            blogText: '<strong>Body text</strong><img src=x/>',
            interests: ['some', 'category'],
          })
          .set('authorization', body.accessToken)
      )
    );
    blogs = blogs.map((blog) => blog.body);
    testUsers = testUsers.map((testUser) => testUser.body);
  }, 100000);

  it('registered the service', () => {
    const service = app.service('blogKorem');
    expect(service).toBeTruthy();
  });

  it('Should be able to like a blog', async () => {
    const blog = blogs[0];
    const user = testUsers[0];
    const Korem = await testServer
      .post(blogKoremEndpoint)
      .send({ entityId: blog.id, time: 1 })
      .set('authorization', user.accessToken);

    expect(Korem.body).toMatchObject({
      User: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        profilePicture: {
          tiny: expect.any(String),
          medium: expect.any(String),
          small: expect.any(String),
          original: expect.any(String),
        },
        createdAt: expect.any(String),
      },
      entityId: blog.id,
      createdAt: expect.any(String),
      created: true, // note here it is created
    });
  });

  it('Like will be removed if made on the same post a second time', async () => {
    const blog = blogs[0];
    const user = testUsers[0];
    const Korem = await testServer
      .post(blogKoremEndpoint)
      .send({ entityId: blog.id, time: 1 })
      .set('authorization', user.accessToken);

    expect(Korem.body).toMatchObject({
      User: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        profilePicture: {
          tiny: expect.any(String),
          medium: expect.any(String),
          small: expect.any(String),
          original: expect.any(String),
        },
        createdAt: expect.any(String),
      },
      entityId: blog.id,
      createdAt: expect.any(String),
      created: false, // note here it is not created
    });
  });
});
