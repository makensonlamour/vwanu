/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';


const userEndpoint = '/users';
const endpoint = '/user_notification_types';
const notificationEndpoint = '/notification';
let users = [];
let server;

describe("user notification Types  service", () => {

  beforeAll(async () => {
    server = request(app);
    users = await Promise.all(
      getRandUsers(2)
        .map(userData =>
          server
            .post(userEndpoint)
            .send({ ...userData, id: undefined })));

    users = users.map(user => user.body);
  })

  afterAll(async () => {
    const sequelize = app.get('sequelizeClient');
    await sequelize.models.UserNotificationTypes.destroy({ where: {} });
    await sequelize.models.Notification.destroy({ where: {} });
    await Promise.all(users.map(async user => server.delete(`${userEndpoint}/${user.id}`).set('Authorization', `Bearer ${user.accessToken}`)))
  });

  it('registered the service', () => {
    const service = app.service(endpoint.split('/')[1]);
    expect(service).toBeTruthy();
  });

  it('Should list all user notification settings', async () => {
    const user1 = users[0];
    const res = await server.get(endpoint).set('Authorization', `Bearer ${user1.accessToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });
  it('User 1 should be notified when user 2 comment their post', async () => {

    const user1 = users[0];
    const user2 = users[1];
    const post = await server.post('/posts').send({ postText: 'test post' }).set('Authorization', `Bearer ${user1.accessToken}`);
    // no notifications before making the comment 
    await app.get('sequelizeClient').models.Notification.destroy({ where: {} });

    await server.post(`/comments`).send({
      postText: 'test comment',
      PostId: post.body.id
    }).set('Authorization', `${user2.accessToken}`);

    const notifications = await server.get(notificationEndpoint).set('Authorization', `Bearer ${user1.accessToken}`);
    expect(notifications.body.data.length).toBeGreaterThan(0);
    expect(notifications.body.data[0].notificationType).toBe('new_comment');
    expect(notifications.body.data[0].UserId).toBe(user2.id);
    expect(notifications.body.data[0].to).toBe(user1.id);
    expect(notifications.body.data[0].sound).toBeTruthy();
  }
  );
  it('User 1 should set their post comment notification settings to silent', async () => {
    const user1 = users[0];
    const res = await server.patch(endpoint).send({ sound: false, notification_slug: 'new_comment' }).set('Authorization', `Bearer ${user1.accessToken}`);
    expect(res.status).toEqual(200);
  });
  it('user 1 should be silently notified when user 2 comment their post', async () => {
    const user1 = users[0];
    const user2 = users[1];
    const post = await server.post('/posts').send({ postText: 'test post' }).set('Authorization', `Bearer ${user1.accessToken}`);
    // no notifications before making the comment 
    await app.get('sequelizeClient').models.Notification.destroy({ where: {} });

    await server.post(`/comments`).send({
      postText: 'test comment',
      PostId: post.body.id
    }).set('Authorization', `${user2.accessToken}`);

    const notifications = await server.get(notificationEndpoint).set('Authorization', `Bearer ${user1.accessToken}`);
    expect(notifications.body.data.length).toBeGreaterThan(0);
    expect(notifications.body.data[0].notificationType).toBe('new_comment');
    expect(notifications.body.data[0].UserId).toBe(user2.id);
    expect(notifications.body.data[0].to).toBe(user1.id);
    expect(notifications.body.data[0].sound).toBeFalsy();
  });

});
