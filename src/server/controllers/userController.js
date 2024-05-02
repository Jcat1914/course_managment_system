import { validationService } from "../services/validationService.js";
import { userSchema } from "../validationSchemas/userSchema.js";

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getUsers();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: error.message });

    }
  }

  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const validatedUser = await validationService.validateData(req.body, userSchema);
      const user = await this.userService.updateUser(id, validatedUser);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

}
