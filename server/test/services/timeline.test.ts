/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'timeline ' service", () => {
  let testServer;
  let createdTestUser;

  const userEndpoint = '/users';
  const postEndpoint = '/posts';
  const endpoint = '/timeline';
  beforeAll(async () => {
    testServer = request(app);
    createdTestUser = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );

    await testServer
      .post(postEndpoint)
      .send({
        postText: ` I am the first post from ${createdTestUser[0].body.firstName} `,
        privacyType: 'private',
      })
      .set('authorization', createdTestUser[0].body.accessToken);
    await Promise.all(
      createdTestUser.map(({ body }) =>
        testServer
          .post(postEndpoint)
          .send({ postText: ` I am a post from ${body.firstName}` })
          .set('authorization', body.accessToken)
      )
    );
  }, 10000);
  it('registered the service', () => {
    const service = app.service('timeline');
    expect(service).toBeTruthy();
  });

  it('should get all post ', async () => {
    const user = createdTestUser[0].body;

    const timeline = await testServer
      .get(endpoint)
      .set('authorization', user.accessToken);

    console.log(timeline.body);
    createdTestUser.forEach((u) => {
      const post = timeline.body.find((p) =>
        p.postText.includes(u.body.firstName)
      );
      expect(post.privacyType).toEqual('public');
      expect(post).toBeDefined();
    });

    // despite a private post was a created it is not being pulled
    expect(timeline.body.every((t) => t.privacyType === 'public')).toBeTruthy();
  });
});
