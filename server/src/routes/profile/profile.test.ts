/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

// custom imports
import db from '../../models';
import expressServer from '../../app';

const user = { email: 'user@example.com', password: '1234565' };

describe('Profile route /api/profile', () => {
  let app = null;
  beforeEach(async () => {
    app = await expressServer(db);
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it('Should create a new Profile for the new user', async () => {
    const createUserResponse = await request(app).post('/api/user').send(user);

    const response = await request(app).post('/api/profile').send({
      userId: createUserResponse.body.data.user.id,
      profilePicture:
        'https://c8.alamy.com/comp/2G6PJB9/default-avatar-photo-placeholder-grey-profile-picture-icon-business-man-illustration-2G6PJB9.jpg',
      coverPicture:
        'https://bigelowsurgical.com/core/wp-content/uploads/2016/05/banner-image-placeholder.jpg',
    });

    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
    expect(response.body.data).toBeDefined();
    expect(response.body.data.profile).toBeDefined();
    expect(response.body.data.profile.UserId).toEqual(
      createUserResponse.body.data.user.id
    );
  });
});
