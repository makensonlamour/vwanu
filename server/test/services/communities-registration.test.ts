/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';
/** Local dependencies */
import app from '../../src/app';
import {
  getRandUsers,
  getRandUser,
} from '../../src/lib/utils/generateFakeUser';

describe("'communities ' service", () => {
  let roles;
  let testUsers;
  let testServer;
  let communities;
  let invitations;
  // let denier;

  // let interests: any[];
  const userEndpoint = '/users';
  const rolesEndpoint = '/community-role';
  const communityEndpoint = '/communities';
  const invitationEndpoint = '/community-invitation-request';

  const endpoint = '/communities-registrations';

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
    // denier = testUsers.shift();

    roles = await Promise.all(
      ['admin', 'member', 'moderator'].map((name) =>
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

    invitations = await Promise.all(
      testUsers.map((guest, idx) =>
        testServer
          .post(invitationEndpoint)
          .send({
            guestId: guest.id,
            CommunityRoleId: roles[idx].id,
            CommunityId: communities[idx].id,
          })
          .set('authorization', creator.accessToken)
      )
    );

    invitations = invitations.map((invitation) => invitation.body);
  }, 100000);

  it('registered the service', () => {
    const service = app.service('communities-registrations');

    expect(service).toBeTruthy();
  });

  it('Users with invitation can respond and become members', async () => {
    const resp = await Promise.all(
      testUsers.map((user, idx) =>
        testServer
          .post(endpoint)
          .send({
            invitationId: invitations[idx].id,
            response: true,
          })
          .set('authorization', user.accessToken)
      )
    );
    resp.forEach(({ body }, idx) => {
      expect(body).toMatchObject({
        message: 'Your response have been recorded',
        newMember: {
          id: expect.any(String),
          canPost: true,
          canUploadDoc: true,
          canUploadVideo: true,
          canUploadPhoto: true,
          banned: true,
          CommunityId: expect.any(String),
          UserId: testUsers[idx].id,
          CommunityRoleId: expect.any(String),
          canInvite: true,
          canMessageInGroup: true,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
          bannedDate: null,
        },
      });
    });
  });
  it('Users with invitation can choose not to become members', async () => {
    let guest: any = getRandUser();
    delete guest.id;
    guest = await testServer.post(userEndpoint).send(guest);

    guest = guest.body;
    const invitation = await testServer
      .post(invitationEndpoint)
      .send({
        guestId: guest.id,
        CommunityRoleId: roles[0].id,
        CommunityId: communities[0].id,
      })
      .set('authorization', creator.accessToken);

    const response = await testServer
      .post(endpoint)
      .send({
        invitationId: invitation.body.id,
        response: false,
      })
      .set('authorization', guest.accessToken);

    expect(response.body).toMatchObject({
      message: expect.any(String),
      newMember: null,
    });
  });

  it.todo('User can become member if group is open without invitation');
});
