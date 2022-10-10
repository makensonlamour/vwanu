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
  let sequelize;
  const userEndpoint = '/users';
  const endpoint = '/blogs';
  beforeAll(async () => {
    sequelize = app.get('sequelizeClient');
    await sequelize.sync({ force: true });

    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(2).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
  }, 200000);
  it('registered the service', () => {
    const service = app.service('blogs');
    expect(service).toBeTruthy();
  });
  it('should be able to create new blogs', async () => {
    const newBlog = {
      blogTitle: 'Title ewr',
      blogText:
        '<strong><p class="color" style="color:red;">Body tex</p></strong>',
      interests: ['some', 'category'],
      publish: 'false',
    };

    const fstBlogs = await Promise.all(
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
        // UserId: expect.any(Number),
        publish: false,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        slug: slugify(newBlog.blogTitle),
        amountOfLikes: 0,
        amountOfComments: 0,

        Interests: [
          {
            id: expect.any(String),
            name: expect.any(String),
            approved: false,
            accessible: true,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            // UserId: expect.any(Number),
            Blog_Interest: expect.any(Object),
          },
          {
            id: expect.any(String),
            name: expect.any(String),
            approved: false,
            accessible: true,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            // UserId: expect.any(Number),
            Blog_Interest: expect.any(Object),
          },
        ],
        User: {
          firstName: expect.any(String),
          lastName: expect.any(String),
          id: expect.any(String),
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
    const { body: modifiedBlog } = await testServer
      .patch(`${endpoint}/${firstBlogs[0].id}`)
      .send(modifications)
      .set('authorization', user.accessToken);

    expect(modifiedBlog).toMatchObject({
      blogText: sanitizeHtml(modifications.blogText),
      blogTitle: sanitizeHtml(modifications.blogTitle),
      id: expect.any(String),
      UserId: expect.any(String),
      publish: false,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      slug: expect.any(String),
      amountOfLikes: 0,
      amountOfComments: 0,
      Interests: expect.any(Array),
      User: expect.objectContaining({
        firstName: expect.any(String),
        lastName: expect.any(String),
        id: expect.any(String),
        profilePicture: expect.any(String),
        createdAt: expect.any(String),
      }),
    });

    const { Interests } = modifiedBlog;
    Interests.forEach((interest) => {
      expect(interest).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        approved: false,
        accessible: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),

        Blog_Interest: expect.any(Object),
      });
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
  it('should not be able to edit some1 else blog', async () => {
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
    await sequelize.models.Blog.sync({ force: true });
    const blogger = testUsers[1].body;
    const reader = testUsers[0].body;
    blogs = await Promise.all(
      [1, 2, 3].map((i) =>
        testServer
          .post(endpoint)
          .send({
            // eslint-disable-next-line no-unneeded-ternary
            publish: i % 2 === 0 ? false : true,
            blogTitle: `Private Title ${i} from ${blogger.id}`,
            blogText: 'Bigger Body, text ',
            categories: ['more', 'some', 'category'],
          })
          .set('authorization', blogger.accessToken)
      )
    );

    const {
      body: { data: publicBlogs },
    } = await testServer.get(endpoint).set('authorization', reader.accessToken);

    expect(publicBlogs).toHaveLength(2);
    const {
      body: { data: myBlogs },
    } = await testServer
      .get(endpoint)
      .set('authorization', blogger.accessToken);
    expect(myBlogs).toHaveLength(3);

    // let user0Blogs = await testServer
    //   .get(`${endpoint}?UserId=${user1.id}`)
    //   .set('authorization', user0.accessToken);

    // user0Blogs = user0Blogs.body.data.map((blog) => blog);

    // user0Blogs.forEach((blog) => {
    //   expect(blog.publish).toBeTruthy();
    // });
  });

  it('should return show no interest in the previous blogs', async () => {
    const reader = testUsers[0].body;
    const {
      body: { data: publicBlogs },
    } = await testServer.get(endpoint).set('authorization', reader.accessToken);

    publicBlogs.forEach((blog) => {
      expect(blog.Interests).toBe(null);
    });
  });

  it('should see a list of interest in each blog', async () => {
    const reader = testUsers[0].body;
    const blogger = testUsers[1].body;
    const interest = ['some', 'category'];

    let newBlogs = await Promise.all(
      [1, 2, 3].map((i) =>
        testServer
          .post(endpoint)
          .send({
            interests: interest,
            blogTitle: `Private Title ${i} from ${blogger.id}`,
            blogText: 'Bigger Body, text ',
            publish: true,
          })
          .set('authorization', blogger.accessToken)
      )
    );
    newBlogs = newBlogs.map((blog) => blog.body);

    expect(
      newBlogs.every((blog) => Array.isArray(blog.Interests))
    ).toBeTruthy();

    const {
      body: { data: publicBlogs },
    } = await testServer.get(endpoint).set('authorization', reader.accessToken);

    expect(
      publicBlogs.some((blog) => Array.isArray(blog.Interests))
    ).toBeTruthy();
  });

  it('should show null for lastResponse', async () => {
    const reader = testUsers[0].body;
    const {
      body: { data: publicBlogs },
    } = await testServer.get(endpoint).set('authorization', reader.accessToken);

    publicBlogs.forEach((blog) => {
      expect(blog.lastResponse).toBe(null);
      expect(blog.lastResponse).toBe(null);
    });
  });
  it('should return 0 comment and 0 reaction ', async () => {
    const reader = testUsers[0].body;
    const {
      body: { data: publicBlogs },
    } = await testServer.get(endpoint).set('authorization', reader.accessToken);

    publicBlogs.forEach((blog) => {
      expect(blog.amountOfComments).toBe(0);
      expect(blog.amountOfReactions).toBe(0);
    });
  });

  it('should not be a responder or reactor', async () => {
    const reader = testUsers[0].body;
    const {
      body: { data: publicBlogs },
    } = await testServer.get(endpoint).set('authorization', reader.accessToken);

    publicBlogs.forEach((blog) => {
      expect(blog.isAReactor).toBe(false);
      expect(blog.isAResponder).toBe(false);
    });
  });
  it('owner should see both his private and public blogs', async () => {
    const user1 = testUsers[1].body;
    const MyBlogs = await testServer
      .get(`${endpoint}?UserId=${user1.id}`)
      .set('authorization', user1.accessToken);

    expect(
      MyBlogs.body.data.some((blog) => blog.publish === false)
    ).toBeTruthy();
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
    expect(mixedBlogs.every((resp) => resp?.publish === true)).toBeTruthy();
  });
});
