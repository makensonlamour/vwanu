/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';
/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'community-join ' service", () => {
  let roles;
  let testUsers;
  let testServer;
  let communities;
  let invitations;
  // let denier;
  let creator;

  const userEndpoint = '/users';
  const rolesEndpoint = '/community-role';
  const communityEndpoint = '/communities';
  const invitationEndpoint = '/community-invitation-request';
  const endpoint = '/community-join';

  // let privateCommunity;
  let publicCommunity;
  // let hiddenCommunity;

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

    [, publicCommunity, ] = communities;

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
    const service = app.service('community-join');
    expect(service).toBeTruthy();
  });

  beforeAll(async () => {}, 1000);

  it.skip('Public communities are auto-join', async () => {
    const user = testUsers[0];

    const join = await testServer
      .post(endpoint)
      .send({
        communityId: publicCommunity.id,
      })
      .set('authorization', user.accessToken);

    expect(join.body).toMatchObject({
      msg: expect.any(String),
      newMenber: {
        id: expect.any(String),
        canPost: expect.any(Boolean),
        canUploadDoc: expect.any(Boolean),
        canUploadVideo: expect.any(Boolean),
        canUploadPhoto: expect.any(Boolean),
        banned: expect.any(Boolean),
        CommunityId: expect.any(String),
        UserId: user.id,
        CommunityRoleId: expect.any(String),
        canInvite: expect.any(Boolean),
        canMessageInGroup: expect.any(Boolean),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        bannedDate: null,
      },
    });
  });
  it.skip('Hidden does not accept join request', async () => {
    const user = testUsers[0];

    const join = await testServer
      .post(endpoint)
      .send({
        communityId: publicCommunity.id,
      })
      .set('authorization', user.accessToken);

    expect(join.statusCode).toEqual(401);
  });
  it.skip('Private communities are accepted-only', async () => {
    const user = testUsers[0];

    const join = await testServer
      .post(endpoint)
      .send({
        communityId: publicCommunity.id,
      })
      .set('authorization', user.accessToken);

    expect(join.statusCode).toEqual(401);
  });
});
