import { NotFound, BadRequest } from '@feathersjs/errors';
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

  async create(data, params) {
    // eslint-disable-next-line prefer-destructuring
    const models = this.app.get('sequelizeClient').models;
    const UserModel = models.User;
    const CommunityModel = models.Community;

    const { communityId } = data;
    const { id } = params.User;

    const user = await UserModel.findByPk(id);
    const community = await CommunityModel.findByPk(communityId);

    if (!community) {
      throw new NotFound('The community does not exist');
    }

    if (!user) {
      throw new NotFound('The user does not exist');
    }

    const alreadyMember = await community.hasMembers(user);

    if (alreadyMember) {
      throw new BadRequest('Your are already a member of that community');
    }
    const community2 = await community.addMembers(user);
    return Promise.resolve(community2);
  }
}
