import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { BadRequest } from '@feathersjs/errors';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class CommunitiesRegistration extends Service {
  app;

  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data) {
    // We look for the invitation including the community
    const { models } = this.app.get('sequelizeClient');
    const invitation = await models.CommunityInvitationRequest.findOne({
      where: { id: data.invitationId, responseDate: null, response: null },
      include: [{ model: models.Community }, { model: models.CommunityRoles }],
    });

    if (!invitation)
      throw new BadRequest(
        'Invitation not found or you already responded to this invitation'
      );
    // Adding the response and the date responded to the invitation.
    await invitation?.update({ ...data, responseDate: new Date() });

    // Adding the person as the community member if  their  response was positive.

    let newMember = null;
    if (data.response) {
      const previousEnrollment = await models.CommunityUsers.findOne({
        where: {
          CommunityId: invitation.CommunityId,
          UserId: invitation.guestId,
          untilDate: null,
        },
        include: [{ model: models.CommunityRoles, attributes: ['id', 'name'] }],
      });

      if (previousEnrollment) {
        if (
          previousEnrollment.CommunityRole.id === invitation.CommunityRole.id
        ) {
          throw new BadRequest(
            `You are already a ${previousEnrollment.CommunityRole.name} of this community`
          );
        }
        previousEnrollment.update({ untilDate: new Date() });
      }

      newMember = await this.app.service('community-users').create({
        CommunityId: invitation.Community.id,
        UserId: invitation.guestId,
        CommunityRoleId: invitation.CommunityRoleId,
      });
    }

    return Promise.resolve({
      message: 'Your response have been recorded',
      newMember,
    });
  }

  //   async delete(id, data, params) {
  //     // eslint-disable-next-line prefer-destructuring
  //     const models = this.app.get('sequelizeClient').models;
  //     const UserModel = models.User;
  //     const CommunityModel = models.Community;

  //     const communityId = id;
  //     const UserId = params.User.id;

  //     const user = await UserModel.findByPk(UserId);
  //     const community = await CommunityModel.findByPk(communityId);

  //     if (!community) {
  //       throw new NotFound('The community does not exist');
  //     }

  //     if (!user) {
  //       throw new NotFound('The user does not exist');
  //     }

  //     const isMember = await community.hasMembers(user);

  //     // eslint-disable-next-line prefer-destructuring
  //     const models = this.app.get('sequelizeClient').models;
  //     const UserModel = models.User;
  //     const CommunityModel = models.Community;

  //     const { communityId } = data;
  //     const { id } = params.User;

  //     const user = await UserModel.findByPk(id);
  //     const community = await CommunityModel.findByPk(communityId);

  //     if (!community) {
  //       throw new NotFound('The community does not exist');
  //     }

  //     if (!user) {
  //       throw new NotFound('The user does not exist');
  //     if (!isMember)
  //       throw new BadRequest('Your are not a member of that community');

  //     const lefter = await community.removeMembers(user);
  //     return Promise.resolve(lefter);
  //   }
}
