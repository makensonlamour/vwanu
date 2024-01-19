/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'community_bans ' service", () => {
  let roles;
  let testUsers;
  let testServer;
  let creator;
  let nonAdminUser;

  const userEndpoint = '/users';
  const rolesEndpoint = '/community-role';
  const communityEndpoint = '/communities';
  const endpoint = '/community-bans';
  const joinEndpoint = '/community-join';
  const sequelize = app.get('sequelizeClient');

  let publicCommunity;

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
    nonAdminUser = testUsers.shift();
    creator = testUsers.shift();

    try {
      roles = await testServer
        .get(rolesEndpoint)
        .set('authorization', nonAdminUser.accessToken);
      roles = roles.body.data.sort((a, b) => a.name - b.name);
    } catch (e) {
      roles = await Promise.all(
        ['admin', 'member', 'moderator'].map((name) =>
          testServer
            .post(rolesEndpoint)
            .send({ name })
            .set('authorization', nonAdminUser.accessToken)
        )
      );
      roles = roles.map((role) => role.body);
    }

    publicCommunity = await testServer
      .post(communityEndpoint)
      .send({
        name: `New community-${Math.random()}`,
        description: `You will be banned -${Math.random()}`,
      })
      .set('authorization', creator.accessToken);

    publicCommunity = publicCommunity.body;

    await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(joinEndpoint)
          .send({ CommunityId: publicCommunity.id })
          .set('authorization', user.accessToken)
      )
    );
  }, 100000);
  afterAll(async () => {
    const { CommunityUsers, Community, CommunityHistory } = sequelize.models;
    await Promise.all(
      [CommunityUsers, Community, CommunityHistory].map((model) =>
        model.destroy({ where: {} })
      )
    );

    sequelize.close();
  });

  it('registered the service', () => {
    const service = app.service('community-bans');
    expect(service).toBeTruthy();
  });

  it('They are all members of the public community before the ban', async () => {
    const communityUsers = await Promise.all(
      testUsers.map((user) =>
        sequelize.models.CommunityUsers.findOne({
          where: { UserId: user.id, CommunityId: publicCommunity.id },
        })
      )
    );

    testUsers.forEach((user, idx) => {
      expect(communityUsers[idx].UserId).toBe(user.id);
    });

    // const history = await testServer
    //   .get(`/community-history?community_id=${publicCommunity.id}`)
    //   .set('authorization', creator.accessToken);
  });

  it.skip('community history records is kept when user joins', async () => {
    const historyRecords = await Promise.all(
      testUsers.map((user) =>
        sequelize.models.CommunityHistory.findOne({
          where: {
            community_id: publicCommunity.id,
            user_id: user.id,
            // joined: true,
          },
        })
      )
    );
    historyRecords.forEach((record, idx) => {
      expect(record).toBeTruthy();
      expect(record.UserId).toBe(testUsers[idx].id);
      expect(record.CommunityId).toBe(publicCommunity.id);
      // expect(record.joined).toBeTruthy();
    });

    // console.log({ historyRecords });
    expect(historyRecords).toBeTruthy();
  });
  it('Cannot create a ban without correct data', async () => {
    const user = testUsers[0];
    const bans = await Promise.all(
      [
        {
          userId: user.id,
        },
        {
          communityId: publicCommunity.id,
        },
        {},
      ].map((data) =>
        testServer
          .post(endpoint)
          .send(data)
          .set('authorization', nonAdminUser.accessToken)
      )
    );

    bans.forEach((ban) => {
      expect(ban.body.errors[0]).toMatchObject({
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: expect.any(Array),
        message: expect.any(String),
      });
      expect(ban.status).toBe(400);
    });
  });
  it('Non admin cannot ban user from community', async () => {
    const bans = await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(endpoint)
          .send({
            userId: user.id,
            communityId: publicCommunity.id,
            comment: 'You will be banned',
          })
          .set('authorization', nonAdminUser.accessToken)
      )
    );

    bans.forEach((ban) => {
      expect(ban.status).toBe(400);
    });
  });

  it('Will ban users from a public community', async () => {
    // ban the user from the public community
    const banneAttemps = await Promise.all(
      testUsers.map((user) =>
        testServer
          .post(endpoint)
          .send({
            userId: user.id,
            communityId: publicCommunity.id,
            comment: 'You will be banned',
          })
          .set('authorization', creator.accessToken)
      )
    );

    banneAttemps.forEach((ban) => {
      expect(ban.status).toBe(201);
    });

    // verify the user was banned from the community

    const banRecord = await Promise.all(
      testUsers.map((user) =>
        testServer
          .get(
            `${endpoint}?user_id=${user.id}&community_id=${publicCommunity.id}`
          )
          .set('authorization', creator.accessToken)
      )
    );

    banRecord.forEach((ban) => {
      expect(ban.body.data).toHaveLength(1);
    });
    testUsers.forEach((user, idx) => {
      expect(banRecord[idx].body.data[0].user_id).toBe(user.id);
      expect(banRecord[idx].body.data[0].community_id).toBe(publicCommunity.id);
    });
  });

  it('user are removed from the community when banned', async () => {
    const searchUuser = await Promise.all(
      testUsers.map((user) =>
        sequelize.models.CommunityUsers.findOne({
          where: { UserId: user.id, CommunityId: publicCommunity.id },
        })
      )
    );

    searchUuser.forEach((user) => {
      expect(user).toBeNull();
    });
  });

  it.skip('community history records is kept when user are removed', async () => {
    const historyRecords = await Promise.all(
      testUsers.map((user) =>
        sequelize.models.CommunityHistory.findOne({
          where: {
            community_id: publicCommunity.id,
            user_id: user.id,
            joined: false,
          },
        })
      )
    );
    historyRecords.forEach((record, idx) => {
      expect(record).toBeTruthy();
      expect(record.UserId).toBe(testUsers[idx].id);
      expect(record.CommunityId).toBe(publicCommunity.id);
      expect(record.joined).toBeFalsy();
    });

    // console.log({ historyRecords });
    expect(historyRecords).toBeTruthy();
  });

  it('Will not ban a user twice', async () => {
    const ban = await testServer
      .post(endpoint)
      .send({
        userId: testUsers[0].id,
        communityId: publicCommunity.id,
        comment: 'You will be banned',
      })
      .set('authorization', creator.accessToken);

    expect(ban.body.message).toContain('already exists');
    expect(ban.status).toBe(400);
  });
});
