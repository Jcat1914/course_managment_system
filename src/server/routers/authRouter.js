import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
export const createAuthRouter = ({ User }) => {
  const authRouter = Router();

  const authController = new AuthController({ User });
  authRouter.post("/login", authController.login);
  authRouter.post("/register", authController.register);

  return authRouter;
};
