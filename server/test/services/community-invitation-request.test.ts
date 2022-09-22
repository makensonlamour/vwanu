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
  guestid: expect.any(String),
  hostid: expect.any(String),
  CommunityRoleId: expect.any(String),
  guest: {
    firstName: expect.any(String),
    lastName: expect.any(String),
    id: expect.any(String),
    profilePicture: expect.any(String),
    createdAt: expect.any(String),
  },
  host: {
    firstName: expect.any(String),
    lastName: expect.any(String),
    id: expect.any(String),
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
    await app.get('sequelizeClient').sync({ logged: false });
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
      ['admin', 'member', 'moderator'].map((name) =>
        testServer
          .post(rolesEndpoint)
          .send({ name })
          .set('authorization', adminUser.accessToken)
      )
    );
    roles = roles.map((role) => role.body);

    roles = await testServer
      .get(rolesEndpoint)
      .set('authorization', adminUser.accessToken);
    roles = roles.body.data;

    const name = 'Community with invitation';
    const description = 'Community with invitation description';
    communities = await Promise.all(
      ['private', 'public', 'hidden'].map((privacyType) =>
        testServer
          .post(communityEndpoint)
          .send({
            name: `${name}-${privacyType}-${Math.random()}`,
            privacyType,
            description: `${privacyType}-${description} - ${Math.random()}`,
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

    invitations = invitations.map((invitation) => invitation.body);

    const { CommunityInvitationRequest } = app.get('sequelizeClient').models;
    // Invitation response
    invitations.map(async (invitation, idx) => {
      expect(invitation).toMatchObject({
        id: expect.any(String),
        guestId: testUsers[idx].id,
        CommunityRoleId: roles[idx].id,
        hostId: creator.id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        CommunityId: communities[idx].id,
        email: null,
      });
      // Checking the guest request exist in the database
      const guest = await CommunityInvitationRequest.findOne({
        where: {
          hostId: creator.id,
          guestId: testUsers[idx].id,
          CommunityRoleId: roles[idx].id,
        },
      });
      expect(guest).toMatchObject({
        id: invitation.id,
        email: null,
        response: null,
        responseDate: null,
        CommunityId: invitation.CommunityId,
        guestId: testUsers[idx].id,
        hostId: creator.id,
        CommunityRoleId: roles[idx].id,
      });
      const invitationRecords = await testServer
        .get(`${endpoint}?guestId=${testUsers[idx].id}`)
        .set('authorization', testUsers[idx].accessToken);
      const inv = InvitationObJect;
      delete inv.guestid;
      delete inv.hostid;
      expect(invitationRecords.body.data.length).toBe(1);
      expect(invitationRecords.body.data[0]).toMatchObject({
        ...inv,

        guest: expect.objectContaining({
          firstName: testUsers[idx].firstName,
          lastName: testUsers[idx].lastName,
          id: testUsers[idx].id,
          createdAt: testUsers[idx].createdAt,
        }),
        host: expect.objectContaining({
          firstName: creator.firstName,
          lastName: creator.lastName,
          id: creator.id,
          createdAt: creator.createdAt,
        }),
        CommunityRole: expect.objectContaining({
          ...roles[idx],
        }),

        Community: expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
        }),
      });

      return 1;
    });
  });
  it('Authorized can see all invitation they sent', async () => {
    const invitationsISent = await testServer
      .get(`${endpoint}/?hostId=${creator.id}`)
      .set('authorization', creator.accessToken);
    const inv = InvitationObJect;
    delete inv.guestid;
    delete inv.hostid;
    invitationsISent.body.data.forEach((invitation) => {
      expect(invitation).toMatchObject({
        ...inv,
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
    receivedInvitationForAll = receivedInvitationForAll.map(
      ({ body }) => body.data
    );

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
    const memberInvitation = invitations.find(
      (inv) => inv.CommunityRoleId === memberRole.id
    );

    const newInvitation = await testServer
      .patch(`${endpoint}/${memberInvitation.id}`)
      .send({ CommunityRoleId: moderator.id })
      .set('authorization', creator.accessToken);
    const invitation = InvitationObJect;
    delete invitation.guestid;
    delete invitation.hostid;
    expect(newInvitation.body).toMatchObject({
      ...invitation,
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
    let responses = await Promise.all(
      invitations.map((invitation) =>
        testServer
          .delete(`${endpoint}/${invitation.id}`)
          .set('authorization', creator.accessToken)
      )
    );
    responses = responses.map((response) => response.body);
    responses.forEach((response, idx) => {
      expect(response).toMatchObject({
        id: invitations[idx].id,
        guestId: invitations[idx].guestId,
        CommunityRoleId: expect.any(String),
        hostId: invitations[idx].hostId,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        CommunityId: expect.any(String),
        email: null,
      });
    });
  });
});

export default sendInvitation;
