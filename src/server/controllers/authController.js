import { userSchema } from "../validationSchemas/index.js";
import { validationService } from "../services/index.js";
export class AuthController {
  constructor(AuthService) {
    this.authService = AuthService;
  }
  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const authUser = await this.authService.login(email, password)
      req.session.user = authUser;
      res.status(200).json({
        msg: "Login Succesfully",
        user: {
          firstName: authUser.firstName,
          lastName: authUser.lastName,
          role: authUser.role,
        }
      })
    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  };

  register = async (req, res) => {
    try {
      const validatedUser = await validationService.validateData(req.body, userSchema);
      const newUser = await this.authService.register(validatedUser)
      res.status(201).json({
        msg: "User Created",
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
        }
      })
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(403).json({ msg: "Invalid Data", error: error.message });
      } else {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  }

  logout = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ err: "Internal Server Error" });
      }
      res.status(200).json({ msg: "Logout Successfully" });
    });
  }
};
