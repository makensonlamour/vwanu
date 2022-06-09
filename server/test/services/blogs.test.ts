/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import slugify from '../../src/lib/utils/slugify';
import sanitizeHtml from '../../src/lib/utils/sanitizeHtml';
/** Local dependencies */

import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'blogs ' service", () => {
  let testServer;
  let testUsers;
  let firstBlogs;
  let blogs;
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
  }, 100000);
  it('registered the service', () => {
    const service = app.service('blogs');
    expect(service).toBeTruthy();
  });

  it('should be able to create new blogs', async () => {
    const newBlog = {
      blogTitle: 'Title ew',
      blogText: '<strong>Body text</strong><img src=x/>',
      interests: ['some', 'category'],
    };
    const fstBlogs: any = await Promise.all(
      testUsers.map(({ body }) =>
        testServer
          .post(endpoint)
          .send(newBlog)
          .set('authorization', body.accessToken)
      )
    );
    firstBlogs = fstBlogs.map((blog) => blog.body);
    firstBlogs.forEach((firstBlog) => {
      expect(firstBlog).toMatchObject({
        blogText: sanitizeHtml(newBlog.blogText),
        blogTitle: sanitizeHtml(newBlog.blogTitle),
        id: expect.any(String),
        UserId: expect.any(Number),
        publish: false,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        BlogId: null,
        slug: slugify(newBlog.blogTitle),
        Response: [],
        Interests: [
          {
            id: expect.any(String),
            name: expect.any(String),
            approved: false,
            accessible: true,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            UserId: expect.any(Number),
            Blog_Interest: expect.any(Object),
          },
          {
            id: expect.any(String),
            name: expect.any(String),
            approved: false,
            accessible: true,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            UserId: expect.any(Number),
            Blog_Interest: expect.any(Object),
          },
        ],
        User: {
          firstName: expect.any(String),
          lastName: expect.any(String),
          id: expect.any(Number),
          profilePicture: expect.any(String),
          createdAt: expect.any(String),
        },
      });
    });
  });
  it('should be able to edit his blogs', async () => {
    const modifications = {
      blogTitle: 'Better Title',
      blogText: 'Bigger Body, text',
      interests: ['more', 'some', 'category'],
    };
    const user = testUsers[0].body;
    const modifiedBlog = await testServer
      .patch(`${endpoint}/${firstBlogs[0].id}`)
      .send(modifications)
      .set('authorization', user.accessToken);

    expect(modifiedBlog.body).toMatchObject({
      blogText: sanitizeHtml(modifications.blogText),
      blogTitle: sanitizeHtml(modifications.blogTitle),
      id: expect.any(String),
      UserId: expect.any(Number),
      publish: false,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      BlogId: null,
      slug: expect.any(String),
      Response: [],
      Interests: [
        {
          id: expect.any(String),
          name: expect.any(String),
          approved: false,
          accessible: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          UserId: expect.any(Number),
          Blog_Interest: expect.any(Object),
        },
        {
          id: expect.any(String),
          name: expect.any(String),
          approved: false,
          accessible: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          UserId: expect.any(Number),
          Blog_Interest: expect.any(Object),
        },
        {
          id: expect.any(String),
          name: expect.any(String),
          approved: false,
          accessible: true,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          UserId: expect.any(Number),
          Blog_Interest: expect.any(Object),
        },
      ],
      User: {
        firstName: expect.any(String),
        lastName: expect.any(String),
        id: expect.any(Number),
        profilePicture: expect.any(String),
        createdAt: expect.any(String),
      },
    });
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
    const user1 = testUsers[1].body;
    const user0 = testUsers[0].body;
    blogs = await Promise.all(
      [1, 2, 3].map((i) =>
        testServer
          .post(endpoint)
          .send({
            publish: i % 2,
            blogTitle: `Private Title ${i} from ${user1.id}`,
            blogText: 'Bigger Body, text ',
            categories: ['more', 'some', 'category'],
          })
          .set('authorization', user1.accessToken)
      )
    );

    let user0Blogs = await testServer
      .get(`${endpoint}?UserId=${user1.id}`)
      .set('authorization', user0.accessToken);
    user0Blogs = user0Blogs.body.map((blog) => blog);

    user0Blogs.forEach((blog) => {
      expect(blog.publish).toBeTruthy();
    });
  });
  it('owner should see both his private and public blogs', async () => {
    const user1 = testUsers[1].body;
    const MyBlogs = await testServer
      .get(`${endpoint}?UserId=${user1.id}`)
      .set('authorization', user1.accessToken);

    expect(MyBlogs.body.some((blog) => blog.publish === false)).toBeTruthy();
  });

  it('only owner can review non-publish blog', async () => {
    const user0 = testUsers[0].body; // not the creator
    let mixedBlogs: any = await Promise.all(
      blogs.map(({ body }) =>
        testServer
          .get(`${endpoint}/${body.id}`)
          .set('authorization', user0.accessToken)
      )
    );

    mixedBlogs = mixedBlogs.map((response) => response.body);

    expect(mixedBlogs.some((resp) => resp?.publish === true)).toBeTruthy();
    // Due to some of the post being private and he is not the creator
    expect(
      mixedBlogs.some((resp) => resp?.message === 'You cannot review this item')
    ).toBeTruthy();
  });
});
