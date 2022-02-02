import userDataProvider from './dataProvider'

const UserService = {
  findById: async (userId: number|string) => {
    const user = await userDataProvider.getUser(userId)
    return user
  },

  createUser: async (body: any) => {
    const user = await userDataProvider.createUser(body)
    return user
  },

  updateUser: async (userId:number|string, body: any) => {
    const user = await userDataProvider.updateUser(userId, body)
    return user
  },

  deleteUser: async (userId:number|string) => {
    const user = await userDataProvider.deleteUser(userId)
    return user
  },
}

export default UserService
