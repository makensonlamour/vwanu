/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'communities ' service", () => {
  // eslint-disable-next-line no-unused-vars
  let testServer;
  let testUsers;
  let communities;
  // let interests: any[];
  const userEndpoint = '/users';
  const endpoint = '/communities';
  const communityRegistrations = '/communities-registrations';
  let creator;
  // let moderators;
  // let administrators;
  // let members;

  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ force: true, logged: false });
    testServer = request(app);
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
  it('All users can join a community', async () => {
    const joins: any[] = await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(communityRegistrations)
          .send({ communityId: communities[1].body.id })
          .set('authorization', user.accessToken)
      )
    );
    console.log('After community joined');
    console.log(joins[0].body);
  });
  it.todo('All User can leave a community');
  it.todo('Members can create discussion in community');
  it.todo('Members can create response on discussion in community');
});
