import config from 'config';

// core imports
import db from '../../models';
import mediaService from './media.service';

const tinySize = config.get('tinySize');
const smallSize = config.get('smallSize');
const mediumSize = config.get('mediumSize');

describe('MediaService', () => {
  let data = null;
  let link = null;

  beforeAll(async () => {
    await db.sequelize.sync();
    link =
      'https://res.cloudinary.com/dnesmf7ah/image/upload/v1646131326/vwanu/profile/p9dbtktf47kxpgyslmjw.jpg';
  });


  it('should save a new data', async () => {

    data = await mediaService.createOne({
      original: link,
    });
    expect(data.id).toBeDefined();
    expect(data.original).toBe(link);
    expect(data.tiny).toEqual(expect.stringContaining(tinySize));
    expect(data.small).toEqual(expect.stringContaining(smallSize));
    expect(data.medium).toEqual(expect.stringContaining(mediumSize));
  });
  it('should get a media', async () => {
    const found: any = await mediaService.getOne(data.id);
    expect(found.id).toEqual(data.id);
  });
  it('should update a new data', async () => {
    [{ medium: 'medium' }, { tiny: 'tiny' }].forEach(async (field) => {
      const newData: any = await mediaService.modifyOne(data, field);

      expect(newData[Object.values(field)[0]]).toEqual(Object.values(field)[0]);
    });
  });
  it('should delete a media', async () => {
    const deleted: any = await mediaService.destroyOne(data, data.id);
    const tryFindOne: any = await mediaService.getOne(data.id);

    expect(tryFindOne).toBe(null);
    expect(deleted).toEqual(data);
  });
});
