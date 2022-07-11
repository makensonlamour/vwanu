/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';

/** Local dependencies */
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

export type invitationObject = {
  accessToken: string;
  guestId: string;
  CommunityId: string;
  CommunityRoleId: string;
};
const sendInvitation =
  (testServer, endpoint) =>
  async ({
    accessToken,
    guestId,
    CommunityId,
    CommunityRoleId,
  }: invitationObject) =>
    testServer
      .post(endpoint)
      .send({
        guestId,
        CommunityRoleId,
        CommunityId,
      })
      .set('authorization', accessToken);

const InvitationObJect = {
  id: expect.any(String),
  email: null,
  response: null,
  responseDate: null,
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  CommunityId: expect.any(String),
  guestId: expect.any(Number),
  hostId: expect.any(Number),
  CommunityRoleId: expect.any(String),
  guest: {
    firstName: expect.any(String),
    lastName: expect.any(String),
    id: expect.any(Number),
    profilePicture: expect.any(String),
    createdAt: expect.any(String),
  },
  host: {
    firstName: expect.any(String),
    lastName: expect.any(String),
    id: expect.any(Number),
    profilePicture: expect.any(String),
    createdAt: expect.any(String),
  },
  CommunityRole: {
    id: expect.any(String),
    name: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  },
};
describe("'communityInvitationRequest' service", () => {
  let roles;
  let testUsers;
  let testServer;
  let communities;
  let invitations;

  // let interests: any[];
  const userEndpoint = '/users';
  const rolesEndpoint = '/community-role';
  const communityEndpoint = '/communities';
  const endpoint = '/community-invitation-request';

  let creator;
  let invites;
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ force: true, logged: false });
    testServer = request(app);
    testUsers = await Promise.all(
      getRandUsers(5).map((u, idx) => {
        let user = { ...u, admin: false };
        if (idx === 1) user = { ...user, admin: true };
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );
    testUsers = testUsers.map((testUser) => testUser.body);
    const adminUser = testUsers.shift();
    creator = testUsers.shift();

    roles = await Promise.all(
      ['admin', 'moderator', 'member'].map((name) =>
        testServer
          .post(rolesEndpoint)
          .send({ name })
          .set('authorization', adminUser.accessToken)
      )
    );
    roles = roles.map((role) => role.body);

    const name = 'New community';
    const description = 'Unique description required';
    communities = await Promise.all(
      ['private', 'public', 'hidden'].map((privacyType, idx) =>
        testServer
          .post(communityEndpoint)
          .send({
            name: `${name}-${idx}`,
            privacyType,
            description: `${description} - ${idx}`,
          })
          .set('authorization', creator.accessToken)
      )
    );

    communities = communities.map((community) => community.body);
    invites = sendInvitation(testServer, endpoint);
  }, 100000);

  it('registered the service', () => {
    const service = app.service('community-invitation-request');
    expect(service).toBeTruthy();
  });
  it('Creator can send invitation for any role', async () => {
    invitations = await Promise.all(
      testUsers.map((guest, idx) =>
        invites({
          guestId: guest.id,
          CommunityRoleId: roles[idx].id,
          CommunityId: communities[idx].id,
          accessToken: creator.accessToken,
        })
      )
    );

    const { CommunityInvitationRequest } = app.get('sequelizeClient').models;
    // Invitation response
    const amount = invitations.map(async (invitation: any, idx) => {
      expect(invitation.statusCode).toEqual(201);

      expect(invitation.body).toMatchObject({
        id: expect.any(String),
        guestId: testUsers[idx].id,
        CommunityRoleId: roles[idx].id,
        hostId: creator.id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        CommunityId: communities[idx].id,
        email: null,
      });

      const guesses = await CommunityInvitationRequest.findOne({
        where: {
          hostId: creator.id,
          guestId: testUsers[idx].id,
          CommunityRoleId: roles[idx].id,
        },
      });

      expect(guesses).toBeTruthy();

      return 1;
    });

    expect(amount.length);
  });
  it('Authorized can see all invitation they sent', async () => {
    const invitationsISent = await testServer
      .get(`${endpoint}/?hostId=${creator.id}`)
      .set('authorization', creator.accessToken);
    invitationsISent.body.forEach((invitation) => {
      console.log(invitation);
      expect(invitation).toMatchObject({
        ...InvitationObJect,

        ...{
          host: {
            firstName: creator.firstName,
            lastName: creator.lastName,
            id: creator.id,
            profilePicture: expect.any(String),
            createdAt: expect.any(String),
          },
        },
      });
    });
  });
  it.todo('should not see invitations sent to others unless admin');
  it('Guest can see all invitation they have received', async () => {
    let receivedInvitationForAll: any = await Promise.all(
      testUsers.map((user) =>
        testServer
          .get(`${endpoint}/?guestId=${user.id}`)
          .set('authorization', user.accessToken)
      )
    );
    receivedInvitationForAll = receivedInvitationForAll.map(({ body }) => body);

    receivedInvitationForAll.forEach((inv, idx) => {
      inv.forEach((invitation) => {
        expect(invitation).toMatchObject({
          ...InvitationObJect,
          ...{
            guest: {
              firstName: testUsers[idx].firstName,
              lastName: testUsers[idx].lastName,
              id: testUsers[idx].id,
              profilePicture: expect.any(String),
              createdAt: expect.any(String),
            },
          },
        });
      });
    });
  });
  it("Authorized can update invitation's role", async () => {
    const memberRole = roles.find((role) => role.name === 'member');
    const moderator = roles.find((role) => role.name === 'moderator');
    let memberInvitation = invitations.find(
      (inv) => inv.body.CommunityRoleId === memberRole.id
    );
    memberInvitation = memberInvitation?.body;
    const newInviatation = await testServer
      .patch(`${endpoint}/${memberInvitation.id}`)
      .send({ CommunityRoleId: moderator.id })
      .set('authorization', creator.accessToken);

    expect(newInviatation.body).toMatchObject({
      ...InvitationObJect,
      ...{
        CommunityRole: {
          id: moderator.id,
          name: moderator.name,
        },
      },
    });
  });
  it.todo('Guest cannot receive two different invitations');
  it.todo('Only the one who invited can modify or delete the invitation');
  it('Admin and  creator can remove invitation for any role', async () => {
    const cnv = invitations[0].body;

    const response = await testServer
      .delete(`${endpoint}/${cnv.id}`)
      .set('authorization', creator.accessToken);

    expect(response.body).toMatchObject(cnv);
  });
});

export default sendInvitation;
