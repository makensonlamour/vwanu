/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import app from '../../src/app';
import { getRandUser } from '../../src/lib/utils/generateFakeUser';


const userEndpoint = '/users';
const endpoint = '/notification_types';
let users = null;
let server;

describe("notification Types  service", () => {

  beforeAll(async () => {
    server = request(app);
    const userData = getRandUser();
    delete userData.id;
    users = await server.post(userEndpoint).send(userData);
  })

  it('registered the service', () => {
    const service = app.service('notification_types');
    expect(service).toBeTruthy();
  });

  it('Should list all notification types', async () => {
    const res = await server.get(endpoint).set('Authorization', `Bearer ${users.body.accessToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);

  });
  it('User should not be able to create a notification type', async () => {
    const res = await server.post(endpoint).send({ notification_name: 'test', notification_description: 'test' }).set('Authorization', `Bearer ${users.body.accessToken}`);
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
  });
  it('User should not be able to delete a notification type', async () => {
    const res = await server.delete(`${endpoint}/1`).set('Authorization', `Bearer ${users.body.accessToken}`);
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
  });
  it('User should not be able to update a notification type', async () => {
    const res = await server.patch(`${endpoint}/1`).send({ notification_name: 'test', notification_description: 'test' }).set('Authorization', `Bearer ${users.body.accessToken}`);
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
  });


});
