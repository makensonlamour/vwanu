/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'interests' service", () => {
  let testServer;
  let testUsers;
  let interests: any[];
  const userEndpoint = '/users';
  const endpoint = '/interests';

  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ force: true, logged: false });
    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(2).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );

    testUsers = testUsers.map((testUser) => testUser.body);
  }, 100000);
  /** Service Test */

  it('registered the service', () => {
    const service = app.service('interests');
    expect(service).toBeTruthy();
  });

  /** CRUD  */

  it('Anyone can create new interests', async () => {
    const content = 'interest';
    interests = await Promise.all(
      testUsers.map((user, idx) =>
        testServer
          .post(endpoint)
          .send({ name: `${content}-${idx}` })
          .set('authorization', user.accessToken)
      )
    );

    interests = interests.map((interest) => interest.body);
    interests.forEach((interest) => {
      expect(interest).toMatchObject({
        id: expect.any(String),
        name: expect.stringContaining(content),
        approved: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    /** auto approved */
    const autoApprovedInterest = interests[1]; // this was created by and admin
    const noneApprovedInterest = interests[0]; // this was created by an none- admin
    expect(noneApprovedInterest.approved).toBeFalsy();
    expect(autoApprovedInterest.approved).toBeTruthy();
  });

  it('Only admin can edit interest', async () => {
    const noneApprovedInterest = interests[0];
    const noneAdminUser = testUsers[0];
    const adminUser = testUsers[1];

    let modifiedInterests = await Promise.all(
      [noneAdminUser, adminUser].map((user) =>
        testServer
          .patch(`${endpoint}/${noneApprovedInterest.id}`)
          .send({ name: 'new interest' })
          .set('authorization', user.accessToken)
      )
    );

    modifiedInterests = modifiedInterests.map(({ body }) => body);

    const firstAttempt = modifiedInterests[0];
    expect(firstAttempt).toMatchObject({
      name: 'BadRequest',
      message: 'You are not authorized to modify interest',
      code: 400,
      className: 'bad-request',
      errors: {},
    });

    const secondAttempt = modifiedInterests[1];
    expect(secondAttempt).toMatchObject({
      id: noneApprovedInterest.id,
      name: 'new interest',
      approved: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
  it('Approved interest cannot be modified', async () => {
    const adminUser = testUsers[1];
    const approvedInterest = interests[1];

    const modifyApprovedInterest = await testServer
      .patch(`${endpoint}/${approvedInterest.id}`)
      .send({ name: 'new interest' })
      .set('authorization', adminUser.accessToken);

    expect(modifyApprovedInterest.body).toMatchObject({
      name: 'BadRequest',
      message: 'Approved interest cannot be modified',
      code: 400,
      className: 'bad-request',
      errors: {},
    });
  });

  it('Everyone can see all approved interest only', async () => {
    const allInterests: any = await testServer.get(endpoint);

    allInterests.body.forEach((interest) => {
      expect(interest).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        approved: true,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
  it('Only admin can delete interest', async () => {
    const noneApprovedInterest = interests[0];
    const noneAdminUser = testUsers[0];
    const adminUser = testUsers[1];

    let deletedInterests = await Promise.all(
      [noneAdminUser, adminUser].map((user) =>
        testServer
          .delete(`${endpoint}/${noneApprovedInterest.id}`)
          .set('authorization', user.accessToken)
      )
    );

    deletedInterests = deletedInterests.map(({ body }) => body);

    const firstAttempt = deletedInterests[0];
    expect(firstAttempt).toMatchObject({
      name: 'BadRequest',
      message: 'You are not authorized to delete interest',
      code: 400,
      className: 'bad-request',
      errors: {},
    });

    const secondAttempt = deletedInterests[1];
    expect(secondAttempt).toMatchObject({
      id: noneApprovedInterest.id,
      name: 'new interest',
      approved: false,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('Approved interest cannot be deleted', async () => {
    /** Cannot delete approved interests */
    const adminUser = testUsers[1];
    const ApprovedInterest = interests[1]; // this was created by and admin
    const deleteResponse = await testServer
      .delete(`${endpoint}/${ApprovedInterest.id}`)
      .set('authorization', adminUser.accessToken);

    expect(deleteResponse.body).toMatchObject({
      name: 'BadRequest',
      message: 'Approved interest cannot be deleted',
      code: 400,
      className: 'bad-request',
      errors: {},
    });
  });
  it.todo('Everyone can see an interest');
  it.todo('should associate a user to an interest');
});
