import { Params } from '@feathersjs/feathers';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';
import common from '../../lib/utils/common';

const { getUploadedFiles } = common;
// eslint-disable-next-line import/prefer-default-export
export class Albums extends Service {
  app;

  // eslint-disable-next-line no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);

    this.app = app;
  }

  // eslint-disable-next-line no-unused-vars
  async create(data, params: Params) {
    const postData = getUploadedFiles(['albumImage', 'albumVideo'], data);
    const post = await this.app.service('albums').Model.create(postData, {
      include: [{ model: this.app.get('sequelizeClient').models.Media }],
    });

    return Promise.resolve(post);
  }

  // eslint-disable-next-line no-unused-vars
  async patch(id, data, params: Params) {

    const postData = getUploadedFiles(['albumImage', 'albumVideo'], data);
  

    const Medias = await Promise.all(
      postData.Media.map((media) =>
        this.app.service('medias').Model.create(media)
      )
    );

    const album = await this.app
      .get('sequelizeClient')
      .models.Album.findByPk(id, {
        include: [
          {
            model: this.app.get('sequelizeClient').models.User,
            attributes: [
              'firstName',
              'lastName',
              'id',
              'profilePicture',
              'createdAt',
              'updatedAt',
            ],
          },
        ],
      });

    await Promise.all(Medias.map((media) => album.addPhotos(media)));

    return Promise.resolve({ album, Medias });
  }
}
