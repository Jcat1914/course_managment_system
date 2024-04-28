import bycrypt from "bcryptjs";
export class AuthController {
  constructor({ User }) {
    this.userModel = User;
  }

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await this.userModel.findOne({ email });
      console.log(user);
      if (!user) res.status(400).json({ msg: "Invalid Credential" });
      const validPassword = bycrypt.compare(password, user.password);
      if (validPassword) {
        req.session.user = user;
        res.status(200).json({
          msg: "Login Succesfully",
          user: {
            firstName: user.first_name,
            lastName: user.last_name,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  register = async (req, res) => {
    console.log(req.body);
    const { first_name, last_name, email, password, phone_number, role } = req.body;
    try {
      const hashPassword = await bycrypt.hash(password, 10);

      const newUser = await this.userModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword,
        phone_number: phone_number,
        role: role,
      });

      res.status(201).json({ msg: "User Created", user: newUser })
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
}
