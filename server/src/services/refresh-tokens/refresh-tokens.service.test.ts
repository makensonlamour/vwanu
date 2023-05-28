/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { Op } from '@sequelize/core';
import request from 'supertest';
import app from '../../app';
import { getRandUsers } from '../../lib/utils/generateFakeUser';
// Global vars for
let createdTestUsers = [];
const userEndpoint = '/users';
const endpoint = '/refresh-tokens';

describe('Refresh tokens service', () => {
  let testServer;
  beforeAll(async () => {
   

    testServer = request(app);
  }, 50000);

  afterAll(async () => {
    if (createdTestUsers.length)
      await Promise.all(
        createdTestUsers.map((requester) =>
          testServer
            .delete(`/users/${requester.body.id}`)
            .set('authorization', requester.body.accessToken)
        )
      );
  });

  it('Newly created user has refresh token', async () => {
    const newUsersR = getRandUsers(2).map((user) => {
      // @ts-ignore
      const u = user;
      delete u.id;
      return testServer.post(userEndpoint).send(u);
    });

    createdTestUsers = await Promise.all(newUsersR);

    // eslint-disable-next-line array-callback-return
    createdTestUsers.every((user) => {
      expect(user.body.refreshToken).toBeDefined();
    });
  });
  it('Send a new access token when ', async () => {
    const response = createdTestUsers.map((user) =>
      testServer.post(endpoint).send({
        refreshToken: user.body.refreshToken,
        id: user.body.id,
      })
    );
    const accessTokens = await Promise.all(response);
    accessTokens.forEach((accessToken) => {
      expect(accessToken.body.accessToken).toBeDefined();
    });
  });
  it('should revoke the refresh token AKA LOGOUT', async () => {
    const RefreshTokenModel = app.get('sequelizeClient').models.RefreshToken;
    const refreshTokens = createdTestUsers.map(({ body }) => body.refreshToken);

    const tokensFromDB = await RefreshTokenModel.findAll({
      where: { refreshToken: { [Op.or]: refreshTokens } },
    });
    tokensFromDB.forEach((token) => {
      expect(token.isValid).toBe(true);
      expect(token.refreshToken).toBeDefined();
    });

    // const delRefreshTokens = await Promise.all(
    //   createdTestUsers.map(({ body }) => {
    //     console.log(`${endpoint}?refreshToken=${body.accessToken}`);

    //     return testServer
    //       .delete(`${endpoint}?refreshToken=${body.refreshToken}`)
    //       .set('authorization', body.accessToken);
    //   })
    // );
    // delRefreshTokens.forEach(({ body }) => console.log('res', body));
  });
});
