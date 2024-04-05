class AuthController {
  constructor({ UserModel }) {
    this.UserModel = UserModel
  }
  login = async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await this.UserModel.findOne({ email, password })

      res.json({ msg: "User Logged in Successfully", user: user })

    } catch (error) {

    }

  }
}
