import { validationService } from "../services/validationService.js";
import { userSchema } from "../validationSchemas/userSchema.js";
import multer from 'multer'
import bycrypt from "bcryptjs";
import { parseExcelFile } from '../helpers/parseExcelFile.js'
import { User } from "../models/User.js";
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

  addUserFromExcel = async (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage }).single('file');

    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'An error occurred while uploading file' });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'Missing file' });
      }

      try {
        // Parse the Excel file to get the user data
        const userData = await parseExcelFile(file.buffer);

        // Iterate over the data and create/update user model instances
        const createdUsers = await Promise.all(
          userData.map(async (userDataItem) => {
            const hashedPassword = await bycrypt.hash(userDataItem.password, 10);

            let user;
            if (userDataItem.id !== undefined) {
              user = await User.findOne({ where: { id: userDataItem.id } });
            }

            if (!user) {
              // If user does not exist, create a new one
              user = await User.create({
                id: userDataItem.id,
                firstName: userDataItem.firstName,
                lastName: userDataItem.lastName,
                email: userDataItem.email,
                phoneNumber: userDataItem.phoneNumber,
                password: hashedPassword,
                role: userDataItem.role || false,
              });
            } else {
              // If user exists, update the data if necessary
              user.firstName = userDataItem.firstName;
              user.lastName = userDataItem.lastName;
              user.email = userDataItem.email;
              user.phoneNumber = userDataItem.phoneNumber;
              user.password = hashedPassword;
              user.role = userDataItem.role || false;
              await user.save();
            }

            return user;
          })
        );

        res.status(201).json({
          message: 'Users uploaded successfully',
          createdUsers,
        });
      } catch (error) {
        console.error('Error uploading users:', error);
        res.status(500).json({
          error: 'An error occurred while uploading users',
        });
      }
    });
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
