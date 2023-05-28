/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

import { getRandUsers } from '../../lib/utils/generateFakeUser';

const endpoint = '/userVisitor';
const userEndpoint = '/users';
let createdTestUsers = [];

describe('User visitors service', () => {
  let testServer;
  beforeAll(async () => {
    await app.get('sequelizeClient').models.User.sync({ logged: false, force: true });

    testServer = request(app);
    // Creating test users
    createdTestUsers = await Promise.all(
      getRandUsers(4).map((user) => {
        const testUser = user;
        delete testUser.id;
        return testServer.post(userEndpoint).send(testUser);
      })
    );
  }, 20000);

  afterAll(async () => {
    await Promise.all(
      createdTestUsers.map(({ body }) =>
        testServer
          .delete(`${endpoint}/${body.id}`)
          .set('authorization', body.accessToken)
      )
    );

    // await app.get('sequelizeClient').close();
  });

  it('should be added as a visitor when request another user page', async () => {
    const requester = createdTestUsers[0].body;
    const profileToVisit = createdTestUsers[1].body;
    const VisitorModel = app.get('sequelizeClient').models.Visitor;
    let visitors = await VisitorModel.findAll({});
    expect(Array.isArray(visitors)).toBeTruthy();
    // expect(visitors.length).toEqual(0);
    await testServer
      .get(`${userEndpoint}/${profileToVisit.id}`)
      .set('authorization', requester.accessToken);

    visitors = await VisitorModel.findAll({});

    expect(Array.isArray(visitors)).toBeTruthy();
    expect(visitors.length).toBeGreaterThan(0);
  });
  it.skip('should return all user you visited', async () => {
    const visitors = await testServer
      .get(`${endpoint}/?action=people-who-visited-me`)
      .set('authorization', createdTestUsers[1].body.accessToken);

    expect(
      visitors.body.data.some(
        (visitor) => visitor.id === createdTestUsers[0].body.id
      )
    ).toBe(true);
  });
  it.skip('should return all users who visited your profile', async () => {
    const hosts = await testServer
      .get(`${endpoint}/?action=people-I-visited`)
      .set('authorization', createdTestUsers[0].body.accessToken);

    expect(
      hosts.body.some((host) => host.id === createdTestUsers[1].body.id)
    ).toBe(true);
  });

  it('should prevent all modification', async () => {
    const responses = await Promise.all(
      ['post', 'delete', 'put', 'patch'].map((method) => {
        const quest = testServer[method];
        return quest(endpoint).send({});
      })
    );

    responses.forEach((response) => {
      expect(response.statusCode).toEqual(StatusCodes.METHOD_NOT_ALLOWED);
    });
  });
});
