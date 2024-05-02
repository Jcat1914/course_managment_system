export class UserService {
  constructor(userModel) {
    this.userModel = userModel
  }
  //retieve all users
  getUsers = async () => {
    try {
      return await this.userModel.findAll({ attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'role'] })
    } catch (error) {
      throw new Error("Could not fetch users")
    }
  }

  //update a given user
  updateUser = async (id, data) => {
    try {
      const user = await this.userModel.findByPk(id)
      if (!user) {
        throw new Error('User not found')
      }
      data.password = user.password
      return await user.update(data)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  deleteUser = async (id) => {
    try {
      const user = await this.userModel.findByPk(id)
      if (!user) {
        throw new Error('User not found')
      }
      return await user.destroy()
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

