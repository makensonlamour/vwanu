/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';
/** Local dependencies */
import app from '../../src/app';
import {
  getRandUsers,
  getRandUser,
} from '../../src/lib/utils/generateFakeUser';

describe("'communities ' service", () => {
  // eslint-disable-next-line no-unused-vars
  let testServer;
  let testUsers;
  let communities;
  let discussions: any;
  // let interests: any[];
  const userEndpoint = '/users';
  const endpoint = '/communities';
  const communityRegistrations = '/communities-registrations';
  const communityAdmins = '/community-admin';

  const discussionEndpoint = '/discussion';
  let creator;
  // let moderators;
  // let administrators;
  // let members;

  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ force: true, logged: false });
    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(4).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );
    testUsers = testUsers.map((testUser) => testUser.body);
    creator = testUsers.shift();
    // administrators = testUsers.map((tester, idx) => {
    //   if (idx === 2 || idx === 3) return tester;
    //   return null;
    // });
    // moderators = testUsers.map((tester, idx) => {
    //   if (idx === 4 || idx === 6) return tester;
    //   return null;
    // });
    // members = testUsers.map((tester, idx) => {
    //   if (idx === 4 || idx === 6) return tester;
    //   return null;
    // });
  }, 100000);

  it('registered the service', () => {
    const service = app.service('communities');
    expect(service).toBeTruthy();
  });

  it('All users can create a community ', async () => {
    const content = 'community';
    communities = await Promise.all(
      ['private', 'public'].map((privacyType, idx) =>
        testServer
          .post(endpoint)
          .send({
            name: `${content}-${idx}`,
            privacyType,
          })
          .set('authorization', creator.accessToken)
      )
    );

    communities.forEach(({ body }) => {
      expect(body).toMatchObject({
        id: expect.any(String),
        name: expect.stringContaining(content),
        coverPicture: null,
        profilePicture: null,
        privacyType: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        UserId: creator.id,
      });
    });
  });
  it('All users can join a community', async () => {
    const communityToJoin = communities[1].body;
    const joins: any[] = await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(communityRegistrations)
          .send({ communityId: communityToJoin.id })
          .set('authorization', user.accessToken)
      )
    );

    joins.forEach(({ body }) => {
      expect(body[0]).toMatchObject({
        CommunityId: communityToJoin.id,
        UserId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  it('Creator can send administrator request to members', async () => {
    const newUser = getRandUser();
    delete newUser.id;
    const community = communities[1].body;
    const nonMember = (await testServer.post(userEndpoint).send(newUser)).body;

    const nonMemberRequest = (
      await testServer
        .post(communityAdmins)
        .send({
          communityId: community.id,
          UserId: nonMember.id,
          action: 'register-admin',
        })
        .set('authorization', creator.accessToken)
    ).body;

    expect(nonMemberRequest).toMatchObject({
      name: 'BadRequest',
      message: 'Please chose a community member',
      code: 400,
      className: 'bad-request',
      errors: {},
    });

    const membersRequest: any = await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(communityAdmins)
          .send({
            communityId: community.id,
            UserId: user.id,
            action: 'register-admin',
          })
          .set('authorization', creator.accessToken)
      )
    );

    membersRequest.forEach(({ body }) => {
      expect(body[0]).toMatchObject({
        CommunityId: community.id,
        UserId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  it('Administrator can accept user or deny administrator offer', async () => {
    // const noAdmin = testUsers.shift();

    const community = communities[1].body;
    const membersRequest: any = await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(communityAdmins)
          .send({
            communityId: community.id,
            UserId: user.id,
            action: 'accept-admin',
            accept: true,
          })
          .set('authorization', user.accessToken)
      )
    );

    membersRequest.forEach(({ body }) => {
      expect(body).toEqual(
        expect.objectContaining({
          message: 'You are now and admin for this community.',
        })
      );
    });
  });

  it('Only community creator and administrator can modify the community', async () => {
    // eslint-disable-next-line consistent-return
    const community = communities[0].body;
    const responses = await Promise.all(
      testUsers.map((user) =>
        testServer
          .patch(`${endpoint}/${community.id}`)
          .send({ name: 'new name' })
          .set('authorization', user.accessToken)
      )
    );

    responses.forEach(({ body }) => {
      expect(body).toMatchObject({
        name: 'BadRequest',
        message: 'Not authorized',
        code: 400,
        className: 'bad-request',
        errors: {},
      });
    });

    const secondAttempt = await testServer
      .patch(`${endpoint}/${community.id}`)
      .send({ name: 'new name' })
      .set('authorization', creator.accessToken);

    expect(secondAttempt.body).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      coverPicture: null,
      profilePicture: null,
      privacyType: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      UserId: creator.id,
    });
  });

  it('Creator can send admin request to members', async () => {});
  it('All User can leave a community', async () => {
    const communityToLeave = communities[1].body;
    const userLeaving = testUsers.shift();

    const lefter = await testServer
      .delete(`${communityRegistrations}/${communityToLeave.id}`)
      .set('authorization', userLeaving.accessToken);

    expect(lefter.body.id).toEqual(communityToLeave.id);

    // Verifying the user really left the community
  });
  it('Members can create discussion in community', async () => {
    const community = communities[0].body;

    console.log('Users', testUsers.length);
    discussions = await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(discussionEndpoint)
          .send({
            title: 'Title test',
            body: 'Body test',
            CommunityId: community.id,
          })
          .set('authorization', user.accessToken)
      )
    );
    console.log('discussion', discussions[0].body);

    discussions.forEach(({ body }) => {
      expect(body).toMatchObject({
        id: expect.any(String),
        privacyType: 'public',
        title: 'Title test',
        body: 'Body test',
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        UserId: expect.any(Number),
        CommunityId: expect.any(String),
        DiscussionId: null,
      });
    });
  });
  it('Members can create response on discussion in community', async () => {
    const community = communities[0].body;

    const responses = await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(discussionEndpoint)
          .send({
            title: 'Title test',
            body: 'Body test',
            CommunityId: community.id,
            DiscussionId: discussions[0].body.id,
          })
          .set('authorization', user.accessToken)
      )
    );

    responses.forEach(({ body }) => {
      expect(body).toMatchObject({
        id: expect.any(String),
        privacyType: 'public',
        title: 'Title test',
        body: 'Body test',
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        UserId: expect.any(Number),
        CommunityId: expect.any(String),
        DiscussionId: discussions[0].body.id,
      });
    });
  });

  it('Only community creator can delete the community ', async () => {
    // eslint-disable-next-line consistent-return
    const community = communities[0].body;
    const responses = await Promise.all(
      testUsers.map((user) =>
        testServer
          .delete(`${endpoint}/${community.id}`)
          .send({ name: 'new name' })
          .set('authorization', user.accessToken)
      )
    );

    responses.forEach(({ body }) => {
      expect(body).toMatchObject({
        name: 'BadRequest',
        message: 'Not authorized',
        code: 400,
        className: 'bad-request',
        errors: {},
      });
    });

    const secondAttempt = await testServer
      .delete(`${endpoint}/${community.id}`)
      .send({ name: 'new name' })
      .set('authorization', creator.accessToken);

    expect(secondAttempt.body).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      coverPicture: null,
      profilePicture: null,
      privacyType: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      UserId: creator.id,
    });
  });
});
