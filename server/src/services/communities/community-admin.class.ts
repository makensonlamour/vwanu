import config from 'config';
import { NotFound, BadRequest } from '@feathersjs/errors';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class CommunityAdmin extends Service {
  app;

  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);

    this.app = app;
  }

  async create(data, params) {
    if (!data.UserId === params.User.id)
      throw new BadRequest('Creators cannot be admins');

    let response;
    // eslint-disable-next-line prefer-destructuring
    const models = this.app.get('sequelizeClient').models;
    const UserModel = models.User;
    const CommunityModel = models.Community;

    const { communityId, action, UserId } = data;

    const community = await CommunityModel.findByPk(communityId);

    if (!community) {
      throw new NotFound('The community does not exist');
    }
    let postulant;
    switch (action) {
      case 'register-admin':
      
        if (params.User.id !== community.UserId)
          throw new BadRequest('Only admins can propose new administrators');

        if (community.numAdmins >= config.get<Number>('MAX_NUMBER_OF_ADMIN'))
          throw new BadRequest('We have the total amount of number required');
        postulant = await UserModel.findByPk(UserId);

        if (!postulant) throw new NotFound('The user is not found');

        if (!(await community.hasMembers(postulant)))
          throw new BadRequest('Please chose a community member');

        if (await community.hasAdministrators(postulant))
          throw new BadRequest('This person is already an admin');

        if (await community.hasAdministratorsRequest(postulant))
          throw new BadRequest('This person already has an admin request');

        response = await community.addAdministratorsRequest(postulant);

        // Todo Notify the user of the request

        break;
      case 'accept-admin':
        postulant = await UserModel.findByPk(params.User.id);
        if (!(await community.hasAdministratorsRequest(postulant)))
          throw new BadRequest('The user has no admin request');

        if (await community.hasAdministrators(postulant))
          throw new BadRequest('This user is already an admin');

        await community.removeAdministratorsRequest(postulant);
        if (data.accept) {
          if (community.numAdmins >= config.get<Number>('MAX_NUMBER_OF_ADMIN'))
            throw new BadRequest('We have the total amount of number allowed');

          await Promise.all([
            community.addAdministrators(postulant),
            community.update({ numAdmins: community.numAdmins + 1 }),
          ]);
          response = { message: 'You are now and admin for this community.' };
        }

        if (!data.accept)
          response = {
            message: 'Thank you for responding to our admin request',
          };

        break;

      default:
        throw new BadRequest('This option is not acceptable');
    }

    // const community2 = await community.addMembers(postulant);
    return Promise.resolve(response);
  }
}
