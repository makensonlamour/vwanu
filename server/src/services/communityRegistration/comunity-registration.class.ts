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

  async create(data, params) {
    console.log('in accepting invitation');

    console.log({ data });
    const { CommunityInvitationRequest } =
      this.app.get('sequelizeClient').models;

    try {
      const response = await CommunityInvitationRequest.update(
        {
          ...data,
          responseDate: new Date(),
        },
        {
          where: {
            id: data.invitationId,
            guestId: params.User.id,
            response: null,
          },
        }
      );
      if (response[0] === 0) {
        throw new BadRequest('Could not respond to invitation');
      }
      return Promise.resolve("You've successfully responded to the invitation");
    } catch (e) {
      console.error(e);
      throw new BadRequest(e.message);
    }
  }
}
