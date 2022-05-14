/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';
import app from '../../app';
import { generateFakeEmail } from '../../lib/utils/generateFakeUser';

const endpoint = '/search';
const userEndpoint = '/users';

describe('search friends service', () => {
  let testServer;
  let createdTestUsers = [];
  let researcher;

  const testUsers = [
    {
      firstName: 'Georges',
      lastName: 'Joseph Francois',
      email: generateFakeEmail(),
      password: 'KsWA1r',
      passwordConfirmation: 'KsWA1r',
    },
    {
      firstName: 'Amber',
      lastName: 'Joseph Francois',
      email: generateFakeEmail(),
      password: 'KsWA1r',
      passwordConfirmation: 'KsWA1r',
    },
    {
      firstName: 'Stephanie',
      lastName: 'Jerome',
      email: generateFakeEmail(),
      password: 'KsWA1r',
      passwordConfirmation: 'KsWA1r',
    },
  ];
  beforeAll(async () => {
    testServer = request(app);

    createdTestUsers = await Promise.all(
      testUsers.map((user) => testServer.post(userEndpoint).send(user))
    );

    researcher = createdTestUsers.shift().body;
  });

  afterAll(async () => {
    await Promise.all(
      createdTestUsers.map(({ body }) =>
        testServer
          .delete(`${userEndpoint}/${body.id}`)
          .set('authorization', body.accessToken)
      )
    );
  });

  it('should search and find user related by first name', async () => {
    const rand = Math.floor(Math.random() * createdTestUsers.length);

    const userToSearch = createdTestUsers[rand].body;
    const res = await testServer
      .get(`${endpoint}/?$search=${userToSearch.firstName}`)
      .set('authorization', researcher.accessToken);

    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: userToSearch.id,
          firstName: userToSearch.firstName,
          lastName: userToSearch.lastName,
        }),
      ])
    );
  });
  it('should search and find user related by last name', async () => {
    const rand = Math.floor(Math.random() * createdTestUsers.length);

    const userToSearch = createdTestUsers[rand].body;
    const res = await testServer
      .get(`${endpoint}/?$search=${userToSearch.lastName}`)
      .set('authorization', researcher.accessToken);

    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: userToSearch.id,
          firstName: userToSearch.firstName,
          lastName: userToSearch.lastName,
        }),
      ])
    );
  });
  it.skip('should search and find user related by email', async () => {
    const rand = Math.floor(Math.random() * createdTestUsers.length);

    const userToSearch = createdTestUsers[rand].body;
    const res = await testServer
      .get(`${endpoint}/?$search=${userToSearch.email}`)
      .set('authorization', researcher.accessToken);

    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: userToSearch.id,
          firstName: userToSearch.firstName,
          lastName: userToSearch.lastName,
        }),
      ])
    );
  });
});
