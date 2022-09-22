/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'community-users ' service", () => {
  let creator;
  let testUsers;
  let testServer;
  let community;
  const endpoint = '/community-users';
  const interests = ['sport', 'education'];
  const userEndpoint = '/users';
  const communityEndpoint = '/communities';
  const rolesEndpoint = '/community-role';
  beforeAll(async () => {
    testServer = request(app);
    await app.get('sequelizeClient').sync({ logged: false, force: true });

    // Creating test users
    testUsers = await Promise.all(
      getRandUsers(5).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );
    testUsers = testUsers.map((testUser) => testUser.body);
    const adminUser = testUsers.shift();
    await Promise.all(
      ['admin', 'member', 'moderator'].map((name) =>
        testServer
          .post(rolesEndpoint)
          .send({ name })
          .set('authorization', adminUser.accessToken)
      )
    );

    creator = testUsers.shift();

    // Creating test communities
    community = await testServer
      .post(communityEndpoint)
      .send({
        name: `Private test community ${Math.random()}`,
        interests,
        description: `This is a test community ${Math.random()}`,
      })
      .set('authorization', creator.accessToken);
  });
  it('registered the service', () => {
    const service = app.service('community-users');
    expect(service).toBeTruthy();
  });
  it('Should return the users of a given community', async () => {
    let users = await testServer
      .get(`${endpoint}/?CommunityId=${community.body.id}`)
      .set('authorization', creator.accessToken);

    users = users.body.data;
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBe(1);

    // The community creator is automatically added to the community as an admin
    users.forEach((foundUser) => {
      expect(foundUser.User).toEqual(
        expect.objectContaining({
          id: creator.id,
          firstName: creator.firstName,
          lastName: creator.lastName,
          profilePicture: expect.any(String),
          createdAt: expect.any(String),
        })
      );

      expect(foundUser.CommunityRole.name).toBe('admin');
    });
  });
  it('should verify if the user is a member of the community', async () => {
    const noneMemberId = testUsers[0].id;
    let possibleMember = await testServer
      .get(
        `${endpoint}/?CommunityId=${community.body.id}&UserId=${noneMemberId}`
      )
      .set('authorization', creator.accessToken);
    possibleMember = possibleMember.body.data;
    expect(possibleMember.length).toBe(0);

    possibleMember = await testServer
      .get(`${endpoint}/?CommunityId=${community.body.id}&UserId=${creator.id}`)
      .set('authorization', creator.accessToken);
    possibleMember = possibleMember.body.data;
    expect(possibleMember.length).toBe(1);
    expect(possibleMember[0].User).toEqual(
      expect.objectContaining({
        id: creator.id,
        firstName: creator.firstName,
        lastName: creator.lastName,
        profilePicture: expect.any(String),
        createdAt: expect.any(String),
      })
    );
  });
});
