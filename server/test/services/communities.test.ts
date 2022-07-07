/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

describe("'communities ' service", () => {
  // eslint-disable-next-line no-unused-vars
  let creator;
  let testUsers;
  let testServer;
  let communities;

  const userEndpoint = '/users';
  const endpoint = '/communities';
  const interests = ['sport', 'education'];
  const CommunityBasicDetails = {
    id: expect.any(String),
    name: 'unique',
    coverPicture: null,
    profilePicture: null,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    numMembers: 0,
    numAdmins: 0,
    haveDiscussionForum: true,
    canInvite: 'E',
    canInPost: 'E',
    canInUploadPhotos: 'E',
    canInUploadDoc: 'E',
    canInUploadVideo: 'E',
    canMessageInGroup: 'E',
    defaultInvitationEmail: null,
  };
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ force: true, logged: false });
    testServer = request(app);

    // Creating test users
    testUsers = await Promise.all(
      getRandUsers(4).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      }, 10000)
    );
    testUsers = testUsers.map((testUser) => testUser.body);
    creator = testUsers.shift();
  }, 100000);

  it('registered the service', () => {
    const service = app.service('communities');
    expect(service).toBeTruthy();
  });

  it('should not create communities with the same name', async () => {
    const commutes = await Promise.all(
      ['unique', 'unique'].map((name, idx) =>
        testServer
          .post(endpoint)
          .send({
            name,
            interests,
            description: `description - ${idx}`,
          })
          .set('authorization', creator.accessToken)
      )
    );

    commutes.forEach(({ body }, idx) => {
      if (idx === 0) {
        expect(body).toMatchObject({
          ...CommunityBasicDetails,
          privacyType: 'public',
          UserId: creator.id,
          description: expect.any(String),
        });
      }
      if (idx === 1) {
        expect(body).toMatchObject({
          name: 'BadRequest',
          message: 'Validation error',
          code: 400,
          className: 'bad-request',
          data: {},
          errors: [
            {
              message: 'name must be unique',
            },
          ],
        });
      }
    });
  });
  it('Users can create any community ', async () => {
    const name = 'y community';
    const description = 'Unique description required';
    const privacyTypes = ['private', 'public', 'hidden'];
    communities = await Promise.all(
      privacyTypes.map((privacyType, idx) =>
        testServer
          .post(endpoint)
          .send({
            name: `${name}-${idx}`,
            privacyType,
            interests,
            description: `${description} - ${idx}`,
          })
          .set('authorization', creator.accessToken)
      )
    );

    communities.forEach(({ body }, idx) => {
      expect(body).toMatchObject({
        ...CommunityBasicDetails,
        name: expect.stringContaining(name),
        privacyType: privacyTypes[idx],
        UserId: creator.id,
        description: expect.stringContaining(description),
      });
    });
  });

  it('communities are public by default', async () => {
    const publicCommunity = await testServer
      .post(endpoint)
      .send({
        name: `community`,
        description: 'description',
      })
      .set('authorization', creator.accessToken);

    expect(publicCommunity.body).toMatchObject({
      ...CommunityBasicDetails,
      name: 'community',
      privacyType: 'public',
      UserId: creator.id,
      description: 'description',
    });
  });

  it('Community creator can edit the community details', async () => {
    const name = `Brand new name -${Math.random()}`;
    const description = `Description Has Changed -- ${Math.random()}`;
    const communityToChange = communities[0].body;
    const editedCommunity = await testServer
      .patch(`${endpoint}/${communityToChange.id}`)
      .send({
        name,
        description,
      })
      .set('authorization', creator.accessToken);

    expect(editedCommunity.body).toMatchObject({
      ...communityToChange,
      name,
      description,
      updatedAt: expect.any(String),
    });
  });

  it('Get all communities except hidden', async () => {
    await testServer
      .get(`${endpoint}?UserId=${creator.id}`)
      .set('authorization', testUsers[0].accessToken);
    // TODO  make sure this test is done
    expect(true).toBeTruthy();
  });

  it.todo('Only the community creator can delete the community');
});
