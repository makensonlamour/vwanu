/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */

import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe('Media service', () => {
  let testServer;
  // let testUsers;
  const userEndpoint = '/users';
  // const endpoint = '/posts';
  beforeAll(async () => {
    const sequelize = app.get('sequelizeClient');
    sequelize.options.logging = false;
    await sequelize.sync({ force: true, logged: false });
    testServer = request(app);
    // testUsers =

    await Promise.all(
      getRandUsers(2).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
  }, 200000);
  it('registered the service', () => {
    const service = app.service('medias');
    expect(service).toBeTruthy();
  });
  it.todo(
    'should add post to media'

    // create a post on a media
    // Use the media id to create a post
  );
  it.todo(
    'should get all post related to a media'

    // get all post related to a media by passing the media id to the post endpoint
  );
});
