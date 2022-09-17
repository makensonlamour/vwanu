/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'discussion ' service", () => {
  let testUsers;
  let testServer;

  let discussion;
  const userEndpoint = '/users';
  const endpoint = '/discussion';

  beforeAll(async () => {
    testServer = request(app);
    await app.get('sequelizeClient').sync({ force: true });

    // Creating test users
    testUsers = await Promise.all(
      getRandUsers(3).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
    testUsers = testUsers.map((testUser) => testUser.body);
  });
  it('registered the service', () => {
    const service = app.service('discussion');

    expect(service).toBeTruthy();
  });

  it('Should create a discussion', async () => {
    discussion = await testServer
      .post(endpoint)
      .send({
        title: 'Test Discussion',
        body: 'Test Discussion Body',
      })
      .set('authorization', `Bearer ${testUsers[0].accessToken}`);
    discussion = discussion.body;
    expect(discussion).toHaveProperty('id');
  });
  it('should get a discussion', async () => {
    const fetched = await testServer
      .get(`${endpoint}/${discussion.id}`)
      .set('authorization', `Bearer ${testUsers[0].accessToken}`);
    console.log(fetched.body);
    expect(fetched.body).toHaveProperty('id');
  });
  it.todo('should update a discussion');
  it.todo('should delete a discussion');

  it.todo('should create a comment on a discussion');
  it.todo('should get  comments on a discussion');
  it.todo('should update a comment on a discussion');
  it.todo('should delete a comment on a discussion');

  it.todo('Only discussion owner can update a discussion');
  it.todo('Only discussion owner can delete a discussion');

  it.todo('Cannot comment on a discussion if it.todo is locked');
  it.todo('Only discussion owner can lock a discussion');
});
