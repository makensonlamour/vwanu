/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'communities ' service", () => {
  // eslint-disable-next-line no-unused-vars
  let creator;
  let testUsers;
  let testServer;
  let communities;
  let sameNameCommunities;

  const userEndpoint = '/users';
  const endpoint = '/communities';
  const interests = ['sport', 'education'];
  let communityModel;
  const CommunityBasicDetails = {
    id: expect.any(String),
    name: 'unique',
    coverPicture: null,
    profilePicture: null,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    numMembers: 0,
    numAdmins: 1,
    haveDiscussionForum: true,
    canInvite: 'E',
    canInPost: 'E',
    canInUploadPhotos: 'E',
    canInUploadDoc: 'E',
    canInUploadVideo: 'E',
    canMessageInGroup: 'E',
    defaultInvitationEmail: null,
  };
  beforeAll(async () => {
    await app.get('sequelizeClient').sync();
    communityModel = app.get('sequelizeClient').models.Community;
    await communityModel.sync({ force: true });

    testServer = request(app);
    // Creating test users
    testUsers = await Promise.all(
      getRandUsers(2).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );
    testUsers = testUsers.map((testUser) => testUser.body);
    creator = testUsers.shift();
  }, 100000);
  afterAll(async () => {
    await Promise.all(
      testUsers.map((user) =>
        testServer
          .delete(`${userEndpoint}/${user.id}`)
          .set('authorization', ` ${user.accessToken}`)
      )
    );
  });

  it.skip('registered the service', () => {
    const service = app.service('communities');
    expect(service).toBeTruthy();
  });

  it.skip('should not create communities with the same name', async () => {
    sameNameCommunities = await Promise.all(
      ['unique', 'unique'].map((name, idx) =>
        testServer
          .post(endpoint)
          .send({
            name,
            interests,
            description: `description - ${idx}`,
          })
          .set('authorization', creator.accessToken)
      )
    );

    sameNameCommunities.forEach(({ body }, idx) => {
      if (idx === 0) {
        expect(body).toMatchObject({
          ...CommunityBasicDetails,
          privacyType: 'public',
          UserId: creator.id,
          description: expect.any(String),
        });
      }
      if (idx === 1) {
        expect(body).toMatchObject({
          name: 'BadRequest',
          message: 'Validation error',
          code: 400,
          className: 'bad-request',
          data: {},
          errors: [
            {
              message: 'name must be unique',
            },
          ],
        });
      }
    });
  });
  it.skip('Users can create any community ', async () => {
    const name = 'y community';
    const description = 'Unique description required';
    const privacyTypes = ['private', 'public', 'hidden'];
    communities = await Promise.all(
      privacyTypes.map((privacyType, idx) =>
        testServer
          .post(endpoint)
          .send({
            name: `${name}-${idx}`,
            privacyType,
            interests,
            description: `${description} - ${idx}`,
          })
          .set('authorization', creator.accessToken)
      )
    );

    communities.forEach(({ body }, idx) => {
      expect(body).toMatchObject({
        ...CommunityBasicDetails,
        name: expect.stringContaining(name),
        privacyType: privacyTypes[idx],
        UserId: creator.id,
        description: expect.stringContaining(description),
      });
    });
  });

  it.skip('communities are public by default', async () => {
    const publicCommunity = await testServer
      .post(endpoint)
      .send({
        name: `community`,
        description: 'description',
      })
      .set('authorization', creator.accessToken);

    expect(publicCommunity.body).toMatchObject({
      ...CommunityBasicDetails,
      name: 'community',
      privacyType: 'public',
      UserId: creator.id,
      description: 'description',
    });
  });

  it.skip('Community creator can edit the community details', async () => {
    const name = `Brand new name -${Math.random()}`;
    const description = `Description Has Changed -- ${Math.random()}`;
    const communityToChange = communities[0].body;
    const editedCommunity = await testServer
      .patch(`${endpoint}/${communityToChange.id}`)
      .send({
        name,
        description,
      })
      .set('authorization', creator.accessToken);

    expect(editedCommunity.body).toMatchObject({
      ...communityToChange,
      name,
      description,
      updatedAt: expect.any(String),
    });
  });

  it.skip('Get all communities except hidden', async () => {
    await testServer
      .get(`${endpoint}?UserId=${creator.id}`)
      .set('authorization', testUsers[0].accessToken);
    // TODO  make sure this test is done
    expect(true).toBeTruthy();
  });

  it.skip('should create and list post in community', async () => {
    const name = 'Public Community name';
    const description = 'Public Community description';
    // create a community
    const community = await testServer
      .post(endpoint)
      .send({
        name,
        interests,
        description,
      })
      .set('authorization', creator.accessToken);
    expect(community.statusCode).toEqual(201);

    // create a post with the community id
    const post = await testServer
      .post('/posts')
      .send({
        postText: 'I am a post in a community',
        CommunityId: community.body.id,
      })
      .set('authorization', creator.accessToken);
    expect(post.statusCode).toEqual(201);
    expect(post.body).toMatchObject({
      privacyType: 'public',
      id: expect.any(Number),
      postText: 'I am a post in a community',
      CommunityId: community.body.id,
      UserId: creator.id,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      PostId: null,
    });

    // list all the post form the community

    const posts = await testServer
      .get(`/posts?CommunityId=${community.body.id}`)
      .set('authorization', creator.accessToken);
    expect(Array.isArray(posts.body)).toBeTruthy();
    expect(posts.body.length).toEqual(1);
    expect(posts.body[0]).toMatchObject({
      ...post.body,
    });

    expect(posts.statusCode).toEqual(200);
  });

  it.todo('should like a community');
  it.todo('list a community Like(s)');
  it.skip('should create and list forum/discussion in community', async () => {
    const name = 'Public Community with discussion';
    const description = 'Public Community with discussion';
    // create a community

    const community = await testServer
      .post(endpoint)
      .send({
        name,
        interests,
        description,
      })
      .set('authorization', creator.accessToken);

    expect(community.statusCode).toEqual(201);
    // create a discussion in that community
    const discussionObject = {
      body: 'This is a discussion body',
      title: 'This is a discussion title',
      CommunityId: community.body.id,
    };
    const discussion = await testServer
      .post('/discussion')
      .send(discussionObject)
      .set('authorization', creator.accessToken);
    expect(discussion.statusCode).toEqual(201);
    expect(discussion.body).toMatchObject({
      ...discussionObject,
      id: expect.any(String),
      CommunityId: community.body.id,
    });
    // list discussions in that community
    const discussionList = await testServer
      .get(`/discussion?CommunityId=${community.body.id}`)
      .set('authorization', creator.accessToken);

    expect(discussionList.statusCode).toEqual(200);
    discussionList.body.forEach((dis) => {
      expect(dis.CommunityId).toEqual(community.body.id);
    });
  });

  it.todo('Get all community except hidden ones');
  it.skip('Only the community creator can delete the community', async () => {
    const name = 'Community to delete';
    const description = 'This community will be deleted';
    // create a community
    const community = await testServer
      .post(endpoint)
      .send({
        name,
        interests,
        description,
      })
      .set('authorization', creator.accessToken);
    expect(community.statusCode).toEqual(201);
    // Fail to delete the community with another user

    const failDelete = await testServer
      .delete(`${endpoint}/${community.body.id}`)
      .set('authorization', testUsers[0].accessToken);

    expect(failDelete.statusCode).toEqual(400);
    expect(failDelete.body).toMatchObject({
      name: 'BadRequest',
      message: 'Not authorized',
      code: 400,
      className: 'bad-request',
      errors: {},
    });
    // delete the community with the creator
    const deletedCommunity = await testServer
      .delete(`${endpoint}/${community.body.id}`)
      .set('authorization', creator.accessToken);

    expect(deletedCommunity.statusCode).toEqual(200);
  });
});
