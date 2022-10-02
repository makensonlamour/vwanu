/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
/** Local dependencies */
import app from '../../app';
import { getRandUsers } from '../../lib/utils/generateFakeUser';

describe('Friend service, ', () => {
  let testServer;
  let createdTestUsers = [];
  const endpoint = '/friendRequest';
  const userEndpoint = '/users';
  beforeAll(async () => {
    testServer = request(app);
    await app.get('sequelizeClient').sync({ force: true });
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

  it(' The friendRequest service is running ', () => {
    const service = app.service('friendRequest');
    expect(service).toBeDefined();
  });

  it.skip('should be able to send a friend request', async () => {
    const requesters = [createdTestUsers[0].body, createdTestUsers[2].body];
    const user = createdTestUsers[1].body;

    const responses = await Promise.all(
      requesters.map((requester) =>
        testServer
          .post(endpoint)
          .send({ UserID: user.id })
          .set('authorization', requester.accessToken)
      )
    );

    responses.forEach((response) => {
      expect(response.status).toEqual(StatusCodes.CREATED);
    });

    responses.forEach((response) => {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            firstName: expect.any(String),
            lastName: expect.any(String),
            profilePicture: expect.objectContaining({
              tiny: expect.any(String),
              medium: expect.any(String),
              small: expect.any(String),
              original: expect.any(String),
            }),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ])
      );
    });
  });

  it.skip('should not be able to send another friend request if one exit', async () => {
    const requester = createdTestUsers[0].body;
    const user = createdTestUsers[1].body;

    const response = await testServer
      .post(endpoint)
      .send({ UserID: user.id })
      .set('authorization', requester.accessToken);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'BadRequest',
        message: expect.any(String),
        code: 400,
        className: 'bad-request',
        errors: {},
      })
    );
  });
  it.skip('should be able to deny the friend request', async () => {
    const requester = createdTestUsers[0].body;
    const user = createdTestUsers[1].body;

    const response = await testServer
      .patch(endpoint)
      .send({ friendId: requester.id, accept: false })
      .set('authorization', user.accessToken);

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body).toEqual({
      id: requester.id,
      firstName: requester.firstName,
      lastName: requester.lastName,
      profilePicture: requester.profilePicture,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it.skip('should not be able to send other friend request if denied previousLy', async () => {
    const requester = createdTestUsers[0].body;
    const user = createdTestUsers[1].body;

    const response = await testServer
      .post(endpoint)
      .send({ UserID: user.id })
      .set('authorization', requester.accessToken);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'BadRequest',
        message: expect.any(String),
        code: 400,
        className: 'bad-request',
        errors: {},
      })
    );
  });

  it.skip('should be able to see all friend request sent ', async () => {
    const requester = createdTestUsers[2].body;
    const user = createdTestUsers[1].body;

    const response = await testServer
      .get(`${endpoint}/?action=people-i-want-to-be-friend-with`)
      .set('authorization', requester.accessToken);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          profilePicture: user.profilePicture,
        }),
      ])
    );
    expect(response.status).toBe(StatusCodes.OK);
  });

  it.skip('should be able to see all friend request receive', async () => {
    const requester = createdTestUsers[2].body;
    const user = createdTestUsers[1].body;

    const response = await testServer
      .get(`${endpoint}/?action=people-who-want-to-Be-my-friend`)
      .set('authorization', user.accessToken);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: requester.firstName,
          lastName: requester.lastName,
          id: requester.id,
          profilePicture: requester.profilePicture,
        }),
      ])
    );
    expect(response.status).toBe(StatusCodes.OK);
  });

  it.skip('should be able to accept a friend request', async () => {
    const requester = createdTestUsers[0].body;
    const user = createdTestUsers[1].body;

    const response = await testServer
      .patch(endpoint)
      .send({ friendId: requester.id, accept: true })
      .set('authorization', user.accessToken);
    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: requester.id,
        firstName: requester.firstName,
        lastName: requester.lastName,
        createdAt: expect.any(String),
      })
    );
  });
  it.skip('should not be able to send an friend request if already friends', async () => {
    const requester = createdTestUsers[0].body;
    const user = createdTestUsers[1].body;

    const response = await testServer
      .post(endpoint)
      .send({ UserID: user.id })
      .set('authorization', requester.accessToken);

    expect(response.body).toEqual({
      name: 'BadRequest',
      message: expect.stringContaining(' previous '),
      code: 400,
      className: 'bad-request',
      errors: expect.any(Object),
    });
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
  it.skip('should be able to remove a friend request sent', async () => {
    const requester = createdTestUsers[3].body;
    const user = createdTestUsers[1].body;
    const response = await testServer
      .post(endpoint)
      .send({ UserID: user.id })
      .set('authorization', requester.accessToken);

    expect(response.status).toEqual(StatusCodes.CREATED);

    // expect(response.body).toEqual(
    //   expect.objectContaining({
    //     id: expect.any(String),
    //     firstName: expect.any(String),
    //     lastName: expect.any(String),
    //     updatedAt: expect.any(String),
    //     createdAt: expect.any(String),
    //   })
    // );

    // Making the remove friend request .
    const removeRes = await testServer
      .delete(`${endpoint}/?friendId=${user.id}`)
      .set('authorization', requester.accessToken);

    expect(removeRes.statusCode).toEqual(200);
    // expect(removeRes.body).toEqual(
    //   expect.objectContaining({
    //     createdAt: expect.any(String),
    //     firstName: expect.any(String),
    //     lastName: expect.any(String),
    //     updatedAt: expect.any(String),
    //     id: expect.any(Number),
    //     profilePicture: expect.objectContaining({
    //       medium: expect.any(String),
    //       original: expect.any(String),
    //       small: expect.any(String),
    //       tiny: expect.any(String),
    //     }),
    //   })
    // );
  });
});
