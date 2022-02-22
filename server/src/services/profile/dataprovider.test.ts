/* eslint-disable no-undef */
import db from '../../models'
import DataProvider from './dataProvider'

describe('Profile DataProvider', () => {
  describe('Profile data provider object', () => {
    it('should be an object', () => {
      expect(typeof DataProvider).toBe('object')
      expect(DataProvider.createProfile).toBeDefined()
      expect(DataProvider.getProfile).toBeDefined()
      expect(typeof DataProvider.createProfile).toBe('function')
    })
  })

  describe('When given correct details ', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('should create a new Profile', async () => {
      jest
        .spyOn(db.Profile, 'create')
        .mockImplementation(
          (profile: any): Promise<any> => Promise.resolve({ ...profile, id: 1 })
        )

      const arg = {
        profile: 'test',
      }
      const response = await DataProvider.createProfile(1, { profile: 'test' })

      expect(response).toMatchObject({ UserId: 1, id: 1 })
      expect(db.Profile.create).toHaveBeenCalledTimes(1)
      expect(db.Profile.create).toHaveBeenCalledWith({ ...arg, UserId: 1 })
    })
  })

  describe('When provided a profileId ', () => {
    const resultValue = { id: 1, UserId: 1 }
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('Should retrieve a new profile', async () => {
      jest.spyOn(db.Profile, 'findOne').mockImplementation((): Promise<any> => Promise.resolve(resultValue))
      const response = await DataProvider.getProfile(1)

      // Expectations
      expect(typeof response).toBe('object')
      expect(response).toMatchObject(resultValue)
      expect(db.Profile.findOne).toHaveBeenCalledTimes(1)
    })
    it('Should not retrieve a profile for an incorrect id', async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      jest.spyOn(db.Profile, 'findOne').mockImplementation((): Promise<any> => Promise.reject({ statusCode: 400 }))
      try {
         await DataProvider.getProfile(3)
      } catch (error) {
        // Expectations
        expect(typeof error).toBe('object')
        expect(db.Profile.findOne).toHaveBeenCalledTimes(1)
      }
    })
  })
})
