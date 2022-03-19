/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import ChanceJS from 'chance';
// Custom imports
import request from 'supertest';
import app from '../../app';
import db from '../../models';
// Default user
const chance = new ChanceJS();
const badPassword = '1';
const goodPassword = 'password2';
const TAG = chance.string({
  length: 12,
  pool: 'abcdefghijklmnopqrstuvwxyz0123456789',
});
const email = `${TAG}_test2@example.com`;
const badUser = { password: badPassword, email };
const goodUser = {
  password: goodPassword,
  email,
  firstName: 'testUser',
  lastName: 'testUser',
  passwordConfirmation: goodPassword,
};

jest.setTimeout(9000);
describe('Authentication ', () => {
  let expressServer = null;
  beforeEach(async () => {
    expressServer = await app(db);
  });
  describe('Given incorrect credentials', () => {
    beforeEach(async () => {});
    it('Should not authenticate', async () => {
      const response = await request(expressServer)
        .post('/api/auth')
        .send(badUser);

      expect(response.status).toBe(400);
      expect(response).toBeDefined();
      expect(true).toBe(true);
    });
  });
  describe('Given correct credentials ', () => {
    beforeEach(async () => {});
    it('should authenticate', async () => {
      // Create a new user ,
      await request(expressServer).post('/api/user').send(goodUser);

      // should be able to authenticate
      const response = await request(expressServer)
        .post('/api/auth')
        .send(goodUser);
      expect(true).toBe(true);
      expect(response.status).toBe(202);
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user.id).toBeDefined();
      expect(typeof response.body.data.token).toBe('string');
      expect(response.header['content-type']).toEqual(
        expect.stringContaining('application/json')
      );
    }, 20000);
  });
});
