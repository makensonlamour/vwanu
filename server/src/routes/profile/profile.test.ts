/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

// custom imports
// import db from '../../models';
// import expressServer from '../../app';

const routeBase = '/api/profile';
// const user = { email: 'user@example.com', password: '1234565' };
const profilePicture =
  'https://c8.alamy.com/comp/2G6PJB9/default-avatar-photo-placeholder-grey-profile-picture-icon-business-man-illustration-2G6PJB9.jpg';
const coverPicture =
  'https://bigelowsurgical.com/core/wp-content/uploads/2016/05/banner-image-placeholder.jpg';
const coverPict = `${__dirname}/../../seed/assets/img/coverPicture.jpeg`;
const profilePict = `${__dirname}/../../seed/assets/img/profilePicture.jpeg`;
describe('Profile route /api/profile', () => {
  const app = null;
  const createdUser = null;

  beforeAll(async () => {
    // jest.setTimeout(10000);
    // app = await expressServer(db);
    // createdUser = await request(app).post('/api/user').send(user);
  });

  it.skip('should not create a profile', async () => {
    [
      {
        firstName: 'Doe',
        dob: new Date(),
        lastName: 'this is my name',
      },
      {
        userId: createdUser.body.data.user.id,
        firstName: 'Doe',
        dob: new Date(),
      },
      {
        userId: createdUser.body.data.user.id,
        lastName: 'John',
        firstName: 'Doe',
      },
      {
        userId: createdUser.body.data.user.id,
        lastName: 'John',
        firstName: 'Doe',
        dob: new Date(),
        profilePicture: 'not url',
      },
      {
        userId: createdUser.body.data.user.id,
        lastName: 'John',
        dob: new Date(),
      },
    ].forEach(async (testUser) => {
      const response = await request(app).post(routeBase).send(testUser);
      expect(response.statusCode).toEqual(400);
    });
  });
  it.skip('Should create a new Profile for the new user', async () => {
    const response = await request(app).post(routeBase).send({
      userId: createdUser.body.data.user.id,
      profilePicture,
      coverPicture,
      lastName: 'John',
      firstName: 'Doe',
      dob: new Date(),
    });

    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
    expect(response.body.data).toBeDefined();
    expect(response.body.data.profile).toBeDefined();
    expect(response.body.data.profile.UserId).toEqual(
      createdUser.body.data.user.id
    );
  }, 10000);

  it.skip('should create a profile with cover and profile picture', async () => {
    await request(app)
      .post(routeBase)
      .attach('profilePicture', profilePict)
      .attach('coverPicture', coverPict)
      .field(
        'body',
        JSON.stringify({
          userId: createdUser.body.data.user.id,
          profilePicture,
          coverPicture,
          lastName: 'John',
          firstName: 'Doe',
          dob: new Date(),
        })
      );

    expect(true).toBeTruthy();
  }, 6000);
});
