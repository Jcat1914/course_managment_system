import { authService } from "../services/index.js";
import { userSchema } from "../validationSchemas/index.js";
import { validationService } from "../services/index.js";
export class AuthController {
  constructor({ User }) {
    this.userModel = User;
  }

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const authUser = await authService.login(this.userModel, email, password)
      req.session.user = authUser;
      res.status(200).json({
        msg: "Login Succesfully",
        user: {
          firstName: authUser.firstName,
          lastName: authUser.lastName,
        }
      })
    } catch (error) {
      res.status(401).json({ error: error })
    }
  };

  register = async (req, res) => {
    try {
      const validatedUser = await validationService.validateData(req.body, userSchema);
      const newUser = await authService.register(this.userModel, validatedUser)
      req.session.user = newUser;
      res.status(201).json({ msg: "User Created", user: newUser })
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(403).json({ msg: "Invalid Data", error: error.message });
      }
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
}
