/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import app from '../../src/app';
import {
  getRandUsers,
  getRandUser,
} from '../../src/lib/utils/generateFakeUser';

let testUsers;
let testServer;
const userEndpoint = '/users';

let firstUser;
describe("'workplace' service", () => {
  // eslint-disable-next-line no-unused-vars

  beforeAll(async () => {
    await app.get('sequelizeClient').models.User.sync({ force: true });
    testServer = request(app);
    // Creating test users
    testUsers = await Promise.all(
      getRandUsers(2).map((user) =>
        testServer.post(userEndpoint).send({ ...user, id: undefined })
      )
    );
    testUsers = testUsers.map((testUser) => testUser.body);
  }, 100000);

  afterAll(async () => {
    await Promise.all(
      testUsers.map((user) =>
        testServer
          .delete(`${userEndpoint}/${user.id}`)
          .set('authorization', ` ${user.accessToken}`)
      )
    );
  });

  it('registered the service', () => {
    const service = app.service('workplace');
    expect(service).toBeTruthy();
  });

  it('Should be able to register an worplace and a user', async () => {
    const workPlace = {
      name: 'vwanu inc',
      description: "vwanu's workplace",
      from: '2021-01-01',
      to: '2021-01-01',
    };

    const newUser = { ...getRandUser(), workPlace, id: undefined };

    const response = await testServer.post(userEndpoint).send(newUser);

    expect(response.statusCode).toBe(201);
    firstUser = response.body;

    const sequelizeClient = app.get('sequelizeClient');
    const { WorkPlace, UserWorkPlace } = sequelizeClient.models;

    const Workplaces = await WorkPlace.findOne({
      where: { name: workPlace.name },
    });
    expect(Workplaces).toMatchObject({
      id: expect.any(String),
      name: workPlace.name,
    });

    const userWorplaces = await UserWorkPlace.findOne({
      where: { WorkPlaceId: Workplaces.id, UserId: response.body.id },
    });

    expect(userWorplaces).toMatchObject({
      description: workPlace.description,
    });
  });

  it('should pull a user with his workplace', async () => {
    const { body: userFromServer } = await testServer
      .get(`${userEndpoint}/${firstUser.id}`)
      .set('authorization', firstUser.accessToken);

    expect(userFromServer.WorkPlaces).toBeDefined();
    expect(userFromServer.WorkPlaces).toHaveLength(1);
  });

  it('should be able to register a user then patch an workplace', async () => {
    const brandNewUser = { ...getRandUser(), id: undefined };
    const { body: bnUser, statusCode } = await testServer
      .post(userEndpoint)
      .send(brandNewUser);

    expect(statusCode).toBe(201);

    // Patch address to user authenticated
    const { statusCode: patchStatusCode } = await testServer
      .patch(`${userEndpoint}/${bnUser.id}`)
      .send({ workPlace: { name: 'vwanu inc' } })
      .set('authorization', bnUser.accessToken);

    expect(patchStatusCode).toBe(200);

    const { body: result } = await testServer
      .get(`${userEndpoint}/${bnUser.id}`)
      .set('authorization', bnUser.accessToken);

    expect(patchStatusCode).toBe(200);
    expect(result.WorkPlaces).toBeDefined();
    expect(result.WorkPlaces).toHaveLength(1);
    expect(result.WorkPlaces[0]).toMatchObject({
      id: expect.any(String),
      name: 'vwanu inc',
    });
  });
});
