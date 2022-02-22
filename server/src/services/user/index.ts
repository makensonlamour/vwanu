import Logger from '../../lib/utils/logger'
import userDataProvider from './dataProvider'

const UserService = {
  findById: async (userId: number | string) => {
    const user = await userDataProvider.getUser(userId)
    return user
  },

  createUser: async (body: any, password: string) => {
    const user = await userDataProvider.createUser(body, password)

    return user
  },

  updateUser: async (userId: number | string, body: any) => {
    const user = await userDataProvider.updateUser(userId, body)
    Logger.info(`User ${(<any>user).id}'s attributes has been updated`)
    return user
  },

  deleteUser: async (userId: number | string) => {
    const user = await userDataProvider.deleteUser(userId)
    return user
  },
}

export default UserService
