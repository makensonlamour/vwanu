/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'communityInvitationRequest' service", () => {
  let roles;
  let testUsers;
  let testServer;
  let communities;
  let invitations;

  // let interests: any[];
  const userEndpoint = '/users';
  const rolesEndpoint = '/community-role';
  const communityEndpoint = '/communities';
  const endpoint = '/community-invitation-request';

  let creator;
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ force: true, logged: false });
    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(5).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
    testUsers = testUsers.map((testUser) => testUser.body);
    const adminUser = testUsers.shift();
    creator = testUsers.shift();

    roles = await Promise.all(
      ['admin', 'creator', 'moderator'].map((name) =>
        testServer
          .post(rolesEndpoint)
          .send({ name })
          .set('authorization', adminUser.accessToken)
      )
    );
    roles = roles.map((role) => role.body);

    const name = 'New community';
    const description = 'Unique description required';
    communities = await Promise.all(
      ['private', 'public', 'hidden'].map((privacyType, idx) =>
        testServer
          .post(communityEndpoint)
          .send({
            name: `${name}-${idx}`,
            privacyType,
            description: `${description} - ${idx}`,
          })
          .set('authorization', creator.accessToken)
      )
    );

    communities = communities.map((community) => community.body);
  }, 100000);

  it('registered the service', () => {
    const service = app.service('community-invitation-request');
    expect(service).toBeTruthy();
  });
  it('Creator can send invitation for any role', async () => {
    invitations = await Promise.all(
      testUsers.map((guest, idx) =>
        testServer
          .post(endpoint)
          .send({
            guestId: guest.id,
            CommunityRoleId: roles[idx].id,
            CommunityId: communities[idx].id,
          })
          .set('authorization', creator.accessToken)
      )
    );

    invitations.forEach((invitation: any, idx) => {
      expect(invitation.statusCode).toEqual(201);

      expect(invitation.body).toMatchObject({
        id: expect.any(String),
        guestId: testUsers[idx].id,
        CommunityRoleId: roles[idx].id,
        hostId: creator.id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        CommunityId: communities[idx].id,
        email: null,
      });
    });
  });

  it('Admin and  creator can remove invitation for any role', async () => {
    const cnv = invitations[0].body;

    const response = await testServer
      .delete(`${endpoint}/${cnv.id}`)
      .set('authorization', creator.accessToken);

    expect(response.body).toMatchObject(cnv);
  });
});
