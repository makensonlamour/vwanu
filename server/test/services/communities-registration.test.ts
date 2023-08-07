/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';
import { Op } from '@sequelize/core';
/** Local dependencies */
import app from '../../src/app';
import {
  getRandUsers,
  getRandUser,
} from '../../src/lib/utils/generateFakeUser';

describe("'communities registration' service", () => {
  let roles;
  let testUsers;
  let testServer;
  let communities;
  let invitations;
  // let denier;

  // let interests: any[];
  const userEndpoint = '/users';
  const rolesEndpoint = '/community-role';
  const communityEndpoint = '/communities';
  const invitationEndpoint = '/community-invitation-request';

  const endpoint = '/communities-registrations';

  let creator;
  const sequelize = app.get('sequelizeClient');
  beforeAll(async () => {
    await sequelize.models.User.sync({});
    await sequelize.models.Community.sync({ force: true });
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
    // denier = testUsers.shift();
    try {
      roles = await testServer
        .get(rolesEndpoint)
        .set('authorization', adminUser.accessToken);
      roles = roles.body.data.sort((a, b) => a.name - b.name);
    } catch (error) {
      roles = await Promise.all(
        ['admin', 'member', 'moderator'].map((name) =>
          testServer
            .post(rolesEndpoint)
            .send({ name })
            .set('authorization', adminUser.accessToken)
        )
      );
      roles = roles.map((role) => role.body);
    }

    const name = 'New community';
    const description = 'Unique description required';
    communities = await Promise.all(
      ['private', 'public', 'hidden'].map((privacyType, idx) =>
        testServer
          .post(communityEndpoint)
          .send({
            name: `${idx}-${privacyType}-${name}-${idx}.`,
            privacyType,
            description: `This is a ${privacyType} Community. ${description} - ${idx}.`,
          })
          .set('authorization', creator.accessToken)
      )
    );

    communities = communities.map((community) => community.body);

    invitations = await Promise.all(
      testUsers.map((guest, idx) =>
        testServer
          .post(invitationEndpoint)
          .send({
            guestId: guest.id,
            CommunityRoleId: roles[idx].id,
            CommunityId: communities[idx].id,
          })
          .set('authorization', creator.accessToken)
      )
    );

    invitations = invitations.map((invitation) => invitation.body);
  }, 100000);

  it('registered the service', () => {
    const service = app.service('communities-registrations');
    expect(service).toBeTruthy();
  });

  it('Accepts invitations', async () => {
    // Accepting the invitations
    const resp: any = await Promise.all(
      testUsers.map((user, idx) =>
        testServer
          .post(endpoint)
          .send({
            invitationId: invitations[idx].id,
            response: true,
          })
          .set('authorization', user.accessToken)
      )
    );
    // eslint-disable-next-line array-callback-return
    resp.map(async ({ body: invitationAcceptResponse }, idx) => {
      expect(invitationAcceptResponse).toMatchObject({
        message: 'Your response have been recorded',
        newMember: {
          id: expect.any(String),
          banned: false,
          CommunityId: expect.any(String),
          UserId: testUsers[idx].id,
          CommunityRoleId: expect.any(String),
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
          bannedDate: null,
        },
      });
      const { CommunityInvitationRequest, CommunityUsers } =
        app.get('sequelizeClient').models;

      const invitation = await CommunityInvitationRequest.findByPk(
        invitations[idx].id
      );
      expect(invitation.response).toBe(true);
      expect(invitation.responseDate).toBeDefined();

      const communityUser = await CommunityUsers.findOne({
        where: {
          UserId: testUsers[idx].id,
          CommunityId: invitations[idx].CommunityId,
          untilDate: null,
        },
      });

      expect(communityUser.id).toBeDefined();
    });
  });
  it('Declines invitation', async () => {
    let guest: any = getRandUser();

    delete guest.id;
    guest = await testServer.post(userEndpoint).send(guest);

    guest = guest.body;
    const invitation = await testServer
      .post(invitationEndpoint)
      .send({
        guestId: guest.id,
        CommunityRoleId: roles[0].id,
        CommunityId: communities[0].id,
      })
      .set('authorization', creator.accessToken);

    const response = await testServer
      .post(endpoint)
      .send({
        invitationId: invitation.body.id,
        response: false,
      })
      .set('authorization', guest.accessToken);

    expect(response.body).toMatchObject({
      message: expect.any(String),
      newMember: null,
    });
  });
  it('Accepts group membership promotion', async () => {
    // Sending a request to promote a user
    const userOBject = getRandUser();

    delete userOBject.id;

    const { body: guest } = await testServer
      .post(userEndpoint)
      .send(userOBject);

    const adminRole = roles.find((role) => role.name === 'admin').id;
    const memberRole = roles.find((role) => role.name === 'member').id;
    const community = communities[0].id;

    // Sending a memberRole invitation

    const memberInvitation = await testServer
      .post(invitationEndpoint)
      .send({
        guestId: guest.id,
        CommunityRoleId: memberRole,
        CommunityId: community,
      })
      .set('authorization', creator.accessToken);
    expect(memberInvitation.statusCode).toEqual(201);

    const { body: memberAcceptance } = await testServer
      .post(endpoint)
      .send({
        invitationId: memberInvitation.body.id,
        response: true,
      })
      .set('authorization', guest.accessToken);
    expect(memberAcceptance).toMatchObject({
      message: 'Your response have been recorded',
      newMember: {
        id: expect.any(String),
        banned: false,
        CommunityId: community,
        UserId: guest.id,
        CommunityRoleId: memberRole,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        bannedDate: null,
      },
    });
    // const { body: fetchedCommunity } = await testServer
    //   .get(`${communityEndpoint}/${community}`)
    //   .set('authorization', creator.accessToken);

    const promotionInvitation = await testServer
      .post(invitationEndpoint)
      .send({
        guestId: guest.id,
        CommunityRoleId: adminRole,
        CommunityId: community,
      })
      .set('authorization', creator.accessToken);

    expect(promotionInvitation.statusCode).toEqual(201);

    // User accept the invitation

    const { body: adminAcceptance } = await testServer
      .post(endpoint)
      .send({
        invitationId: promotionInvitation.body.id,
        response: true,
      })
      .set('authorization', guest.accessToken);

    expect(adminAcceptance).toMatchObject({
      message: 'Your response have been recorded',
      newMember: {
        id: expect.any(String),
        banned: false,
        CommunityId: community,
        UserId: guest.id,
        CommunityRoleId: adminRole,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
        bannedDate: null,
      },
    });
    // Verify the user is promoted and has a new role

    const { CommunityInvitationRequest, CommunityUsers } =
      app.get('sequelizeClient').models;
    const invitation = await CommunityInvitationRequest.findByPk(
      promotionInvitation.body.id
    );
    expect(invitation.response).toBe(true);
    expect(invitation.responseDate).toBeDefined();

    const communityUser = await CommunityUsers.findOne({
      where: {
        UserId: guest.id,
        CommunityId: community,
        CommunityRoleId: adminRole,
        untilDate: null,
      },
    });

    expect(communityUser.id).toBeDefined();
    const oldRole = await CommunityUsers.findOne({
      where: {
        UserId: guest.id,
        CommunityId: community,
        CommunityRoleId: memberRole,
        untilDate: { [Op.ne]: null },
      },
    });

    expect(oldRole.id).toBeDefined();
  });

  it.todo('Denies group membership promotion');

  it.todo('User can become member if group is open without invitation');
});
