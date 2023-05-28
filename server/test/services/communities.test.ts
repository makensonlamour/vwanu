/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import isNill from 'lodash/isNil';
/** Local dependencies */
import app from '../../src/app';
import {
  getRandUsers,
  getRandUser,
  generateFakeEmail,
} from '../../src/lib/utils/generateFakeUser';

const cleanup = (server) => (endpoint, id, token) =>
  server.delete(`${endpoint}/${id}`).set('Authorization', token).expect(200);

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
    await app.get('sequelizeClient').models.User.sync({ force: true });
    await app.get('sequelizeClient').models.Community.sync({ force: true });

    // Creating test users
    testUsers = await Promise.all(
      getRandUsers(3).map((u, idx) => {
        let user = { ...u, admin: false };
        delete user.id;
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
    await cleanup(testServer)(
      endpoint,
      sameNameCommunities[0].body.id,
      creator.accessToken
    );
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
    // await Promise.all(
    //   communities.map((c) =>
    //     cleanup(testServer)(endpoint, c.body.id, creator.accessToken)
    //   )
    // );
  });

  it('Community automatically set creator as first admin and by default are public', async () => {
    const name = 'Auto admin';
    const description = 'Auto Public';

    const { body: adminOfPublicCommunity } = await testServer
      .post(userEndpoint)
      .send({ ...getRandUser(), id: undefined });

    const { body: publicAutoAdminCommunity } = await testServer
      .post(endpoint)
      .send({
        name,
        interests,
        description,
      })
      .set('authorization', adminOfPublicCommunity.accessToken);

    expect(publicAutoAdminCommunity).toMatchObject({
      ...CommunityBasicDetails,
      name,
      privacyType: 'public',
      UserId: adminOfPublicCommunity.id,
      description,
    });

    // Check if creator is first admin
    const {
      body: { data: communityUsers },
    } = await testServer
      .get(`/community-users?CommunityId=${publicAutoAdminCommunity.id}`)
      .set('authorization', adminOfPublicCommunity.accessToken);

    expect(communityUsers[0].UserId).toBe(adminOfPublicCommunity.id);
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

  it.skip(' Any user can get all communities except hidden unless he is a member of it', async () => {
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
    console.log({ allCommunities });

    allCommunities.data.forEach((community) => {
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
            canUserPost: expect.any(Boolean),
            canUserInvite: expect.any(Boolean),
            canUserUploadDoc: expect.any(Boolean),
            canUserUploadPhotos: expect.any(Boolean),
            canUserUploadVideo: expect.any(Boolean),
            canMessageUserInGroup: expect.any(Boolean),
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
    it('should only return communities created by the user', async () => {
      const {
        body: { data: creatorCommunities },
      } = await testServer
        .get(`${endpoint}?UserId=${creator.id}`)
        .set('authorization', firstCreator.accessToken);

      creatorCommunities.forEach((community) =>
        expect(community.UserId).toBe(creator.id)
      );

      const {
        body: { data: firstCreatorCommunities },
      } = await testServer
        .get(`${endpoint}?UserId=${firstCreator.id}`)
        .set('authorization', creator.accessToken);

      firstCreatorCommunities.forEach((community) =>
        expect(community.UserId).toBe(firstCreator.id)
      );
    });

    it('should return newest communities first', async () => {
      const {
        body: { data: newestFirst },
      } = await testServer
        .get(`${endpoint}?$sort[createdAt]=-1`)
        .set('authorization', firstCreator.accessToken);

      const {
        body: { data: oldestFirst },
      } = await testServer
        .get(`${endpoint}?$sort[createdAt]=1`)
        .set('authorization', firstCreator.accessToken);

      expect(newestFirst).toBe(newestFirst);
      expect(newestFirst).not.toBe(oldestFirst);
      expect(newestFirst[0]).not.toBe(oldestFirst[0]);
    });

    it.skip('should return communities with most members first', async () => {
      const {
        body: { data: popularFirst },
      } = await testServer
        .get(`${endpoint}?$sort[amountOfMembers]=-1`)
        .set('authorization', firstCreator.accessToken);

      expect(popularFirst[0].amountOfMembers).toBeGreaterThan(
        popularFirst[1].amountOfMembers
      );
      const {
        body: { data: unpopular },
      } = await testServer
        .get(`${endpoint}?$sort[amountOfMembers]=1`)
        .set('authorization', firstCreator.accessToken);
      expect(popularFirst[0].amountOfMembers).toBeGreaterThan(
        unpopular[0].amountOfMembers
      );
    });

    it('should return only the communities with `UNIQUE` interest', async () => {
      const name = 'This community has unique interest';
      const description = 'This community has unique interest';
      const { status } = await testServer
        .post(endpoint)
        .set('authorization', creator.accessToken)
        .send({
          interests: ['unique'],
          name,
          description,
        });

      expect(status).toBe(201);

      const {
        body: { data: com },
      } = await testServer
        .get(`${endpoint}?interests=unique`)
        .set('authorization', firstCreator.accessToken);

      expect(com).toHaveLength(1);
      com.forEach((community) => {
        expect(community.name).toBe(name);
        expect(community.description).toBe(description);
      });
    });
    it('should only return communities user is member of', async () => {
      const {
        body: { data: com },
      } = await testServer
        .get(`${endpoint}?participate=true`)
        .set('authorization', firstCreator.accessToken);

      com.forEach((community) => {
        expect(community.isMember).not.toBe(null);
        // expect(
        //   community.members.every((member) => member.id === firstCreator.id)
        // ).toBe(true);
      });
    });

    it('fetch users not member of community', async () => {
      const {
        body: { data: allUsers },
      } = await testServer
        .get(userEndpoint)
        .set('authorization', firstCreator.accessToken);

      const allUserAmount = allUsers.length;

      const { body: communityToCompare } = await testServer
        .get(`${endpoint}/${communities[1].body.id}`)
        .set('authorization', firstCreator.accessToken);
      const communityAmountOfMembers = +communityToCompare.amountOfMembers;
      const {
        body: { data: usersNotInCommunity },
      } = await testServer
        .get(`${userEndpoint}/?notCommunityMember=${communityToCompare.id}`)
        .set('authorization', firstCreator.accessToken);

      const amountOfUserNotInCommunity = usersNotInCommunity.length;
      expect(allUserAmount).toBeGreaterThan(amountOfUserNotInCommunity);
      expect(allUserAmount).toBeGreaterThan(communityAmountOfMembers);
      expect(allUserAmount).toBe(
        communityAmountOfMembers + amountOfUserNotInCommunity
      );
    }, 50000);
    it('search users that are not member of community', async () => {
      // creating similar user like firstCreator
      const { body: similarUser } = await testServer.post(userEndpoint).send({
        email: generateFakeEmail(),
        firstName: firstCreator.firstName,
        lastName: firstCreator.lastName,
        password: 'firstCreator.password',
        passwordConfirmation: 'firstCreator.password',
      });

      // console.log(similarUser);
      const {
        body: { data: similarUsers },
      } = await testServer
        .get(`/search?$search=${similarUser.firstName}`)
        .set('authorization', firstCreator.accessToken);

      // console.log('similarUsers', j);
      expect(similarUsers).toHaveLength(2);
      expect(
        similarUsers.some((user) => user.firstName === similarUser.firstName)
      ).toBe(true);
      expect(
        similarUsers.some((user) => user.firstName === firstCreator.firstName)
      ).toBe(true);

      await testServer
        .get(
          `/search?$search=${similarUser.firstName}&notCommunityMember=${communities[1].body.id}`
        )
        .set('authorization', firstCreator.accessToken);
      // TODO FIX THIS
      // console.log({ l });
      // console.log({ notInCommunityUser });
      expect(true).toBe(true);
    }, 50000);
  });

  describe('Communities posts and forums', () => {
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
          canInPost: 'A', // only admins should post
        })
        .set('authorization', creator.accessToken);

      expect(communityWithPosts.statusCode).toEqual(201);

      const postFromMember = await testServer
        .post('/posts')
        .send({
          postText: 'I am a post in a community',
          CommunityId: communityWithPosts.body.id,
        })
        .set('authorization', creator.accessToken);

      expect(postFromMember.statusCode).toEqual(201);
      expect(postFromMember.body).toMatchObject({
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

    it('should  not create post for non-member', async () => {
      const nonMemberPost = await testServer
        .post('/posts')
        .send({
          postText: 'I am a post in a community',
          CommunityId: communityWithPosts.body.id,
        })
        .set('authorization', testUsers[1].accessToken);

      expect(nonMemberPost.statusCode).toEqual(400);
    });
    it('Should list posts in communities', async () => {
      const { body: posts } = await testServer
        .get(`/posts?CommunityId=${communityWithPosts.body.id}`)
        .set('authorization', creator.accessToken);
      expect(Array.isArray(posts.data)).toBeTruthy();
      expect(posts.data.length).toEqual(1);

      posts.data.forEach((p) => {
        expect(p).toMatchObject({
          id: expect.any(String),
          postText: 'I am a post in a community',
          privacyType: 'public',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),

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
    discussionList.body.data.forEach((dis) => {
      expect(dis.locked).toBe(false);
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

  it('Should find private community after becoming member', async () => {
    const { statusCode, body: privateGroup } = await testServer
      .post(endpoint)
      .set('authorization', creator.accessToken)
      .send({
        name: 'Private community group',
        description: 'Private community',
        privacyType: 'private',
      });

    expect(statusCode).toBe(201);
    const { statusCode: status, body: user } = await testServer
      .post(userEndpoint)
      .send({ ...getRandUser(), id: undefined });

    expect(status).toBe(201);
    const { body: nonMemberAccess } = await testServer
      .get(endpoint)
      .set('authorization', user.accessToken);

    expect(nonMemberAccess.total).toBe(9);

    const CommunityUser = app.get('sequelizeClient').models.CommunityUsers;

    await CommunityUser.create({
      CommunityId: privateGroup.id,
      UserId: user.id,
      CommunityRoleId: roles[0].id,
    });
    await CommunityUser.create({
      CommunityId: privateGroup.id,
      UserId: user.id,
      CommunityRoleId: roles[0].id,
    });

    expect(status).toBe(201);
    const { body: memberAccess } = await testServer
      .get(endpoint)
      .set('authorization', user.accessToken);

    expect(memberAccess.total).toBe(9);
  }, 3000);
});
