import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
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

    const invitation = await models.CommunityInvitationRequest.findByPk(
      data.invitationId,
      {
        include: [
          { model: models.Community },

          { model: models.CommunityRoles },
        ],
      }
    );

    if (!invitation) throw new Error('Invitation not found');

    // Adding the response and the date responded to the invitation.

    await invitation?.update({ ...data, responseDate: new Date() });

    const hasAccess = (row, role) => {
      switch (row) {
        case 'A':
          return role === 'admin';

        case 'M':
          if (role === 'admin') return true;
          return role === 'moderator';

        case 'E':
          return true;
        default:
          throw new Error('No setting for that option');
      }
    };
    const accessLevel = (community: any, role: string) => ({
      canInvite: hasAccess(community.canInvite, role),
      canInPost: hasAccess(community.canInPost, role),
      canInUploadDoc: hasAccess(community.canInUploadDoc, role),
      canInUploadVideo: hasAccess(community.canInUploadVideo, role),
      canMessageInGroup: hasAccess(community.canMessageInGroup, role),
      canInUploadPhotos: hasAccess(community.canInUploadPhotos, role),
    });

    // Adding the person as the community member if  their  response was positive.

    let newMember = null;
    if (data.response) {
      const accesses = accessLevel(
        invitation.Community,
        invitation.CommunityRole.name
      );

      newMember = await this.app.service('community-users').create({
        CommunityId: invitation.Community.id,
        UserId: invitation.guestId,
        CommunityRoleId: invitation.CommunityRoleId,
        ...accesses,
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
