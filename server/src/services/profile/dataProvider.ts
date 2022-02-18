import db from '../../models'

export default {
  createProfile: async (userId: number | String, profileData: any) => new Promise((resolve, reject) => {
      db.Profile.create({ ...profileData, UserId: userId })
        .then((newProfile: any) => {
          resolve(newProfile)
        })
        .catch((err: Error) => reject(err))
    }),
  getProfile: async (profileId: number) => new Promise((resolve, reject) => {
      db.Profile.findOne({ where: { id: profileId } })
        .then((profile: any) => {
          resolve(profile)
        })
        .catch((err: Error) => {
          reject(err)
        })
    }),
}
