/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import isNill from 'lodash/isNil';
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
  let communityWithPosts;
  let communityWithForum;
  let users;
  let firstCreator;
  let distinctCommunities;
  let roles;

  const userEndpoint = '/users';
  const endpoint = '/communities';
  const interests = ['sport', 'education'];
  const rolesEndpoint = '/community-role';
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
    testServer = request(app);
    await app.get('sequelizeClient').sync({ force: true });

    // Creating test users
    testUsers = await Promise.all(
      getRandUsers(3).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );
    testUsers = testUsers.map((testUser) => testUser.body);

    creator = testUsers.shift();

    roles = await Promise.all(
      ['admin', 'member', 'moderator'].map((name) =>
        testServer
          .post(rolesEndpoint)
          .send({ name })
          .set('authorization', creator.accessToken)
      )
    );

    roles = roles.map((role) => role.body);
    users = await Promise.all(
      getRandUsers(3).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );
    users = users.map((user) => user.body);
    firstCreator = users.shift();
    distinctCommunities = await Promise.all(
      ['private', 'public', 'hidden'].map((p) =>
        testServer
          .post(endpoint)
          .send({
            name: `community-${p}`,
            privacyType: p,
            interests,
            description: `description-${p}`,
          })
          .set('authorization', firstCreator.accessToken)
      )
    );
    distinctCommunities = distinctCommunities.map((c) => c.body);
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

  it('registered the service', () => {
    const service = app.service('communities');
    expect(service).toBeTruthy();
  });

  it('should not create communities with the same name', async () => {
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
  it('Users can create any community ', async () => {
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

  it('Community automatically set creator as first admin', async () => {
    const name = 'Auto admin community ';
    const description =
      'Each community automatically set creator as first admin';
    const privacyTypes = ['private', 'public', 'hidden'];

    let newAdmins = await Promise.all(
      getRandUsers(3).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );

    newAdmins = newAdmins.map((user) => user.body);

    const autoAdminCommunities = await Promise.all(
      newAdmins.map((user, idx) =>
        testServer
          .post(endpoint)
          .send({
            name: `${name}-${idx}`,
            privacyType: privacyTypes[idx],
            interests,
            description: `${description} - ${idx}`,
          })
          .set('authorization', user.accessToken)
      )
    );
    autoAdminCommunities.forEach(({ body }, idx) => {
      expect(body).toMatchObject({
        ...CommunityBasicDetails,
        name: expect.stringContaining(name),
        privacyType: privacyTypes[idx],
        UserId: newAdmins[idx].id,
        description: expect.stringContaining(description),
        numAdmins: 1,
      });
    });

    // Check if creator is first admin
    let communityUsers = await Promise.all(
      autoAdminCommunities.map(({ body: { id } }) =>
        testServer
          .get(`/community-users?CommunityId=${id}`)
          .set('authorization', creator.accessToken)
      )
    );
    communityUsers = communityUsers.map((communityUser) => communityUser.body);
    communityUsers.forEach((communityUser, idx) => {
      expect(communityUser[0].UserId).toBe(newAdmins[idx].id);
      expect(communityUser[0].User).toMatchObject({
        firstName: newAdmins[idx].firstName,
        lastName: newAdmins[idx].lastName,
        id: newAdmins[idx].id,
        createdAt: newAdmins[idx].createdAt,
      });
    });
  });

  it('communities are public by default', async () => {
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

  it('Community creator can edit the community details', async () => {
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
      name,
      description,
      updatedAt: expect.any(String),
    });
  });

  it(' Any user can get all communities except hidden unless he is a member of it', async () => {
    // Manually adding a user to a community
    const newUser = testUsers[1];
    const infiltratedCommunity = communities[0].body;
    const role = roles[2];

    const { CommunityUsers } = app.get('sequelizeClient').models;

    await CommunityUsers.create({
      CommunityId: infiltratedCommunity.id,
      UserId: newUser.id,
      CommunityRoleId: role.id,
    });

    const { body: allCommunities } = await testServer
      .get(endpoint)
      .set('authorization', creator.accessToken);

    allCommunities.forEach((community) => {
      expect(community).toMatchObject({
        name: expect.any(String),
        description: expect.any(String),
        privacyType: expect.any(String),
        id: expect.any(String),
        UserId: expect.any(String),
        amountOfMembers: expect.any(Number),
        members: expect.any(Array),
        profilePicture: null,
        coverPicture: null,
      });
      if (infiltratedCommunity.id === community.id) {
        expect(community.members).toHaveLength(2);
        expect(community.members.some((member) => member.id === newUser.id));
      } else {
        expect(community.members).toHaveLength(1);
      }

      // This community was created without endpoint
      if (
        community.name === 'community' &&
        community.description === 'description'
      ) {
        expect(community.Interests).toBe(null);
      }

      if (community.privacyType === 'hidden') {
        expect(
          community.members.some((member) => member.id === creator.id)
        ).toBe(true);
      }
      if (!isNill(community.Interests)) {
        expect(community.Interests).toHaveLength(2);
      }
      community?.Interests?.forEach((interest) => {
        expect(interest).toMatchObject({
          name: expect.any(String),
          id: expect.any(String),
        });
      });

      if (community.UserId === creator.id) {
        expect(community.IsMember).toMatchObject({
          id: expect.any(String),
          role: 'admin',
          roleId: expect.any(String),
        });
      } else {
        expect(community.IsMember).toBe(null);
      }
    });
  });

  describe('Communities Access', () => {
    it('should not see community private and Hidden community details when not member', async () => {
      let accessToCommunities = await Promise.all(
        distinctCommunities.map((com) =>
          testServer
            .get(`${endpoint}/${com.id}`)
            .set('authorization', users[0].accessToken)
        )
      );
      accessToCommunities = accessToCommunities.map((c) => c.body);
      accessToCommunities.forEach((com) => {
       
        if (!com.privacyType && com?.privacyType !== 'public') {
          expect(com).toMatchObject({
            name: 'BadRequest',
            message: expect.stringContaining('Community with id'),
            code: 400,
            className: 'bad-request',
            errors: {},
          });
        } else {
          expect(com).toMatchObject({
            name: expect.any(String),
            description: expect.any(String),
            privacyType: expect.any(String),
            id: expect.any(String),
            UserId: firstCreator.id,
            // amountOfMembers: '1',
            IsMember: null,
            canPost: true,
            canInvite: true,
            canInUploadDoc: true,
            canInUploadPhotos: true,
            canInUploadVideo: true,
            canMessageInGroup: true,
            Interests: expect.any(Array),
          });
          com.Interests.forEach((interest) => {
            expect(interest).toMatchObject({
              name: expect.any(String),
              id: expect.any(String),
            });
          });
        }
      });
    });
  });

  describe('Communities posts and forums', () => {
    it.todo('Only authorized members can post in community');

    it.todo('Only authorized members can see community posts');
    it.todo('Only authorized members can see community discussions');

    it('should create posts in community', async () => {
      const name = 'Public Community name';
      const description = 'Public Community description';
      // create a community
      communityWithPosts = await testServer
        .post(endpoint)
        .send({
          name,
          interests,
          description,
        })
        .set('authorization', creator.accessToken);
      expect(communityWithPosts.statusCode).toEqual(201);

      const post = await testServer
        .post('/posts')
        .send({
          postText: 'I am a post in a community',
          CommunityId: communityWithPosts.body.id,
        })
        .set('authorization', creator.accessToken);

      expect(post.statusCode).toEqual(201);
      expect(post.body).toMatchObject({
        privacyType: 'public',
        id: expect.any(String),
        postText: 'I am a post in a community',
        CommunityId: communityWithPosts.body.id,
        UserId: creator.id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        PostId: null,
      });
    });
    it('Should list posts in communities', async () => {
      const { body: posts } = await testServer
        .get(`/posts?CommunityId=${communityWithPosts.body.id}`)
        .set('authorization', creator.accessToken);
      expect(Array.isArray(posts)).toBeTruthy();
      expect(posts.length).toEqual(1);
      posts.forEach((p) => {
        expect(p).toMatchObject({
          id: expect.any(String),
          multiImage: false,
          multiAudio: false,
          multiVideo: false,
          postText: 'I am a post in a community',
          imageCount: 0,
          videoCount: 0,
          audioCount: 0,
          privacyType: 'public',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          UserId: creator.id,
          CommunityId: communityWithPosts.body.id,
          mediaId: null,
          PostId: null,
          MediumId: null,
          Comments: [],
          User: {
            firstName: creator.firstName,
            lastName: creator.lastName,
            id: creator.id,
            profilePicture: expect.any(String),
            createdAt: creator.createdAt,
          },
        });
      });
    });
  });

  it.todo('should like a community');
  it.todo('list a community Like(s)');
  it('should create forum/discussion in community', async () => {
    const name = 'Public Community with discussion';
    const description = 'Public Community with discussion';
    // create a community

    communityWithForum = await testServer
      .post(endpoint)
      .send({
        name,
        interests,
        description,
      })
      .set('authorization', creator.accessToken);

    expect(communityWithForum.statusCode).toEqual(201);
    communityWithForum = communityWithForum.body;
    // create a discussion in that community
    const discussionObject = {
      body: 'This is a discussion body',
      title: 'This is a discussion title',
      CommunityId: communityWithForum.id,
    };
    const discussion = await testServer
      .post('/discussion')
      .send(discussionObject)
      .set('authorization', creator.accessToken);
    expect(discussion.statusCode).toEqual(201);
    expect(discussion.body).toMatchObject({
      ...discussionObject,
      id: expect.any(String),
      CommunityId: communityWithForum.id,
    });
  });

  it('should list forum/discussion in community', async () => {
    // list discussions in that community
    const discussionList = await testServer
      .get(`/discussion?CommunityId=${communityWithForum.id}`)
      .set('authorization', creator.accessToken);

    expect(discussionList.statusCode).toEqual(200);
    discussionList.body.forEach((dis) => {
      expect(dis.CommunityId).toEqual(communityWithForum.id);
    });
  });

  it('Only the community creator can delete the community', async () => {
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
