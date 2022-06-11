import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

// eslint-disable-next-line import/prefer-default-export
export class BlogKorem extends Service {
  app;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(data) {
    const { UserId, entityId } = data;
    const { Korem } = this.app.get('sequelizeClient').models;
    const [result, created] = await Korem.findOrCreate({
      where: { UserId, entityId },
      default: { ...data },
    });

    if (!created) await result.destroy();

    return Promise.resolve({
      entityId: result.entityId,
      createdAt: result.createdAt,
      UserId: result.UserId,
      created,
    });
  }
}
