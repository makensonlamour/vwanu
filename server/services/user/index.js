import userDataProvider from './dataProvider.js'

const UserService = {
  findById: async (userId) => {
    const user = await userDataProvider.getUser(userId)
    return user
  },

  createUser: async (body) => {
    const user = await userDataProvider.createUser(body)
    return user
  },

  updateUser: async (userId, body) => {
    const user = await userDataProvider.updateUser(userId, body)
    return user
  },

  deleteUser: async (userId) => {
    const user = await userDataProvider.deleteUser(userId)
    return user
  },
}

export default UserService
