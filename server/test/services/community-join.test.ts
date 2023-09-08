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
  let creator;

  const userEndpoint = '/users';
  const rolesEndpoint = '/community-role';
  const communityEndpoint = '/communities';
  const invitationEndpoint = '/community-invitation-request';
  const endpoint = '/community-join';

  let privateCommunity;
  let publicCommunity;
  let hiddenCommunity;

  beforeAll(async () => {
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

    try {
      roles = await testServer
        .get(rolesEndpoint)
        .set('authorization', adminUser.accessToken);
      roles = roles.body.data.sort((a, b) => a.name - b.name);
    } catch (e) {
      roles = await Promise.all(
        ['admin', 'member', 'moderator'].map((name) =>
          testServer
            .post(rolesEndpoint)
            .send({ name })
            .set('authorization', adminUser.accessToken)
        )
      );
      roles = roles.map((role) => role.body);
    }

    const name = 'New community';
    const description = 'Unique description required';
    communities = await Promise.all(
      ['private', 'public', 'hidden'].map((privacyType, idx) =>
        testServer
          .post(communityEndpoint)
          .send({
            name: `${name}-${idx}-${Math.random()}`,
            privacyType,
            description: `${description} - ${idx}-${Math.random()}`,
          })
          .set('authorization', creator.accessToken)
      )
    );

    communities = communities.map((community) => community.body);

    [privateCommunity, publicCommunity, hiddenCommunity] = communities;

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

  it('Public communities are auto-join', async () => {
    const user = testUsers[0];

    const join = await testServer
      .post(endpoint)
      .send({
        CommunityId: publicCommunity.id,
      })
      .set('authorization', user.accessToken);

    expect(join.body).toMatchObject({
      id: expect.any(String),
      CommunityId: expect.any(String),
      guestId: user.id,
      response: true,
      responseDate: expect.any(String),
      CommunityRoleId: expect.any(String),
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
      email: null,
      hostId: null,
    });

    const foundUser = await app
      .get('sequelizeClient')
      .models.CommunityUsers.findOne({
        where: { CommunityId: publicCommunity.id, UserId: user.id },
      });

    expect(foundUser).toMatchObject({
      banned: false,
      bannedDate: null,
      CommunityId: expect.any(String),
      UserId: user.id,
      CommunityRoleId: expect.any(String),
    });
  });
  it('Cannot Join same community twice', async () => {
    const user = testUsers[0];

    const { statusCode } = await testServer
      .post(endpoint)
      .send({
        CommunityId: publicCommunity.id,
      })
      .set('authorization', user.accessToken);

    expect(statusCode).toBe(400);
  });
  it('Hidden does not accept join request', async () => {
    const user = testUsers[0];

    const join = await testServer
      .post(endpoint)
      .send({
        CommunityId: hiddenCommunity.id,
      })
      .set('authorization', user.accessToken);

    expect(join.body).toMatchObject({
      name: 'BadRequest',
      message: expect.any(String),
      code: 400,
      className: 'bad-request',
      errors: {},
    });
    expect(join.statusCode).toEqual(400);
  });
  it('Private communities are accepted-only', async () => {
    const user = testUsers[0];

    const join = await testServer
      .post(endpoint)
      .send({
        CommunityId: privateCommunity.id,
      })
      .set('authorization', user.accessToken);

    expect(join.body).toMatchObject({
      name: 'BadRequest',
      message: expect.any(String),
      code: 400,
      className: 'bad-request',
      errors: {},
    });
    expect(join.statusCode).toEqual(400);
  });
});
