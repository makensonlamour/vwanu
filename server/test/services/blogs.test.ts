/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'blogs ' service", () => {
  let testServer;
  let testUsers;
  let firstBlogs;
  const userEndpoint = '/users';
  const endpoint = '/blogs';
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ alter: true, logged: false });
    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(2).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );

    // testUsers = testUsers.map((testUser) => testUser.body);
  }, 100000);
  it('registered the service', () => {
    const service = app.service('blogs');
    expect(service).toBeTruthy();
  });

  it('should be able to create new blogs', async () => {
    const user = testUsers[0].body;
    const newBlog = {
      blogTitle: 'Title',
      blogText: 'Body, text',
      categories: ' some, category',
    };
    const blogs: any = await Promise.all(
      testUsers.map(({ body }) =>
        testServer
          .post(endpoint)
          .send(newBlog)
          .set('authorization', body.accessToken)
      )
    );
    firstBlogs = blogs.map((blog) => blog.body);

    expect(firstBlogs[0]).toMatchObject({
      ...newBlog,
      id: expect.any(Number),
      UserId: user.id,
      privacyType: 'private',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      BlogId: null,
    });
  });
  it('should be able to edit his blogs', async () => {
    const modifications = {
      blogTitle: 'Better Title',
      blogText: 'Bigger Body, text',
      categories: ' more,some, category',
    };
    const user = testUsers[0].body;
    const modifiedBlog = await testServer
      .patch(`${endpoint}/${firstBlogs[0].id}`)
      .send(modifications)
      .set('authorization', user.accessToken);
    expect(modifiedBlog.body).toEqual(
      expect.objectContaining({
        ...modifications,
        id: firstBlogs[0].id,
        UserId: user.id,
      })
    );
  });
  it('should be able to delete his own blog', async () => {
    const user = testUsers[0].body;
    await testServer
      .delete(`${endpoint}/${firstBlogs[0].id}`)
      .set('authorization', user.accessToken);

    const proof = await app
      .get('sequelizeClient')
      .models.Blog.findOne({ where: { id: firstBlogs[0].id } });
    expect(proof).toEqual(null);
  });
  it('should not be able to modify some1 else blog', async () => {
    const modifications = {
      blogTitle: 'Better Title',
      blogText: 'Bigger Body, text',
      categories: ' more,some, category',
    };
    const user = testUsers[0].body;
    const modifiedBlog = await testServer
      .patch(`${endpoint}/${firstBlogs[1].id}`)
      .send(modifications)
      .set('authorization', user.accessToken);

    expect(modifiedBlog.body.message).toEqual(
      expect.stringContaining('Not authorized')
    );
  });
  it('should not be able to delete some1 else blog', async () => {
    const user = testUsers[0].body;
    const modifiedBlog = await testServer
      .delete(`${endpoint}/${firstBlogs[1].id}`)
      .set('authorization', user.accessToken);

    expect(modifiedBlog.body.message).toEqual(
      expect.stringContaining('Not authorized')
    );
  });
  it('should only show public blogs if not owner', async () => {
    const user = testUsers[1].body;
    await Promise.all(
      [1, 2, 3].map((i) =>
        testServer
          .post(endpoint)
          .send({
            privacyType: i % 2 ? 'private' : 'public',
            blogTitle: `Private Title ${i} from ${user.id}`,
            blogText: 'Bigger Body, text ',
            categories: ' more,some, category',
          })
          .set('authorization', user.accessToken)
      )
    );

    let blogs = await testServer
      .get(`${endpoint}?UserId=${user.id}`)
      .set('authorization', testUsers[0].body.accessToken);
    blogs = blogs.body.map((blog) => blog);

    blogs.forEach((blog) => {
      expect(blog).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          blogText: expect.any(String),
          blogTitle: expect.any(String),
          categories: expect.any(String),
          privacyType: 'public',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          UserId: user.id,
          BlogId: null,
        })
      );
    });
  });
  it('owner should see both his private and public blogs', async () => {});
});
