/* eslint-disable no-underscore-dangle */
import getEntityById from '../../../../src/lib/utils/getEntityById';

describe('getEntityById', () => {
  it('should return the entity with the given id', async () => {
    const entity = { id: 1 };
    const service = {
      _get: jest.fn(),
    };
    service._get.mockResolvedValueOnce(entity);
    const returnedEntity = await getEntityById(service, entity.id);
    expect(service._get.mock.calls.length).toBe(1);
    expect(returnedEntity).toEqual(entity);
  });
  it('should throw an error if the entity is not found', async () => {
    const entity = { id: 1 };
    const service = {
      _get: jest.fn(),
    };
    service._get.mockRejectedValueOnce(new Error('Entity not found'));
    try {
      await getEntityById(service, entity.id);
    } catch (error) {
      expect(service._get.mock.calls.length).toBe(1);
      expect(error.message).toBe('Entity not found');
    }
  });
});
