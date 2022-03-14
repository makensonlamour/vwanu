/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

// custom dependencies
import app from '../../app';
import db from '../../models';

describe('/api/post', () => {
  let expressServer = null;
  let newUser = null;
  let token = null;
  beforeAll(async () => {
    expressServer = await app(db);
    const response = await request(expressServer).post('/api/user').send({
      firstName: 'John',
      lastName: 'franc',
      email: 'john@example.com',
      password: 'bigPassword123',
      passwordConfirmation: 'bigPassword123',
    });

    newUser = response.body.data.user;
    token = response.body.data.token;
  });
  it('should not create a post ', async () => {
    [
      {
        postText: ' I am a post text',
      },
    ].forEach(async (requestData) => {
      const response = await request(expressServer)
        .post('/api/post')
        .send(requestData);
      expect(response.statusCode).toBe(500);
      expect(response.body.data).toBeUndefined();
      // expect(response.body.errors).toBeDefined();
    });
  });
  it('should create a new post', async () => {
    const response = await request(expressServer)
      .post('/api/post')
      .set('x-auth-token', token)
      .send({ postText: 'I am a new post', userId: newUser.id });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.post).toBeDefined();
    expect(response.body.data.post).toEqual(
      expect.objectContaining({
        postText: expect.any(String),
        id: expect.any(Number),
        private: false,
        // userId: newUser.id,
      })
    );
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
  });
});
