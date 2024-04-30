import bycrypt from "bcryptjs";
import { UnauthorizedError } from "../helpers/errors.js";
export class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async login(email, password) {
    // logic to authenticate user 
    try {
      const user = await this.userModel.findOne({ where: { email } });
      const validPassword = await bycrypt.compare(password, user.password);
      if (validPassword) {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      }
    } catch (error) {
      throw new UnauthorizedError("Invalid email or password");
    }
  }
  async register(user) {
    // logic to register user
    try {
      const hashPassword = await bycrypt.hash(user.password, 10);
      user.password = hashPassword;
      const newUser = await this.userModel.create(user);
      return {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      };
    } catch (error) {
      console.log(error)
      throw new Error("Could not create user");
    }
  }
}
//export const AuthService = {
//
//  login: async function (userModel, email, password) {
//    // logic to authenticate user 
//    //
//    try {
//      const user = await userModel.findOne({ where: { email } });
//      const validPassword = await bycrypt.compare(password, user.password);
//      if (validPassword) {
//        return {
//          firstName: user.first_name,
//          lastName: user.last_name,
//          email: user.email,
//          role: user.role,
//        };
//      }
//    } catch (error) {
//      throw new UnauthorizedError("Invalid email or password");
//    }
//  },
//  register: async function (userModel, user) {
//    // logic to register user
//    try {
//      const hashPassword = await bycrypt.hash(user.password, 10);
//      user.password = hashPassword;
//      const newUser = await userModel.create(user);
//      return {
//        firstName: newUser.first_name,
//        lastName: newUser.last_name,
//        email: newUser.email,
//        role: newUser.role,
//      };
//    } catch (error) {
//      console.log(error)
//      throw new Error("Could not create user");
//    }
//  }
//}
