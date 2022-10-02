/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

import { getRandUsers } from '../../lib/utils/generateFakeUser';

let createdTestUsers = [];
const endpoint = '/followers';

const userEndpoint = '/users';
describe('Friend service, ', () => {
  let testServer;
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ logged: false });
    testServer = request(app);

    createdTestUsers = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
  }, 20000);

  afterAll(async () => {
    await Promise.all(
      createdTestUsers.map(({ body }) =>
        testServer
          .delete(`${userEndpoint}/${body.id}`)
          .set('authorization', body.accessToken)
      )
    );

    await app.get('sequelizeClient').close();
  });
  it('The user service is running', async () => {
    const service = app.service('followers');
    expect(service).toBeDefined();
  });

  it('should start following someone', async () => {
    const requester = createdTestUsers[0].body;
    const user = createdTestUsers[1].body;

    const response = await testServer
      .post(endpoint)
      .send({ UserId: user.id })
      .set('authorization', requester.accessToken);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        UserId: user.id,
        FollowerId: requester.id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })
    );
  });
  it('should stop following someone', async () => {
    const requester = createdTestUsers[2].body;
    const user = createdTestUsers[3].body;

    const response = await testServer
      .post(endpoint)
      .send({ UserId: user.id })
      .set('authorization', requester.accessToken);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        UserId: user.id,
        FollowerId: requester.id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })
    );

    // Checking the follower records exist in dthe db

    // eslint-disable-next-line prefer-destructuring
    const Model = app.get('sequelizeClient').models.User_Follower;

    let records = await Model.findAll({
      where: { UserId: user.id, FollowerId: requester.id },
    });
    expect(
      records.some(
        (record) =>
          record.UserId === user.id && record.FollowerId === requester.id
      )
    ).toBeTruthy();

    await testServer
      .delete(`${endpoint}?UserId=${user.id}`)
      .set('authorization', requester.accessToken);

    // ensuring the follower records no longe exist in db
    records = await Model.findAll({
      where: { UserId: user.id, FollowerId: requester.id },
    });
    expect(
      records.every(
        (record) =>
          record.UserId !== user.id && record.FollowerId !== requester.id
      )
    ).toBeTruthy();
  });
  it('get the list of all his followers', async () => {
    const user = createdTestUsers[1].body;
    const response = await testServer
      .get(`${endpoint}/?action=people-who-follow-me`)
      .set('authorization', user.accessToken);

    expect(response.status).toBe(StatusCodes.OK);
    response.body.data.forEach((f) => {
      expect(f).toMatchObject({
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        profilePicture: expect.any(String),
      });
    });
  }, 2000);
  it('get a list of all the people he is following', async () => {
    const requester = createdTestUsers[0].body;
    const response = await testServer
      .get(`${endpoint}/?action=people-i-follow`)
      .set('authorization', requester.accessToken);

    expect(response.status).toBe(StatusCodes.OK);
    response.body.data.forEach((f) => {
      expect(f).toMatchObject({
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        profilePicture: expect.any(String),
      });
    });
  });

  it('should get a list of people someone else is following', async () => {
    const peopleWithFollower = createdTestUsers[1].body;
    const user = createdTestUsers[3].body;
    const response = await testServer
      .get(
        `${endpoint}/?action=people-who-follow-me&UserId=${peopleWithFollower.id}`
      )
      .set('authorization', user.accessToken);

    expect(response.status).toBe(StatusCodes.OK);
    response.body.data.forEach((follower) => {
      expect(follower).toMatchObject({
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        profilePicture: expect.any(String),
      });
    });
  });
});
