import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
export const createAuthRouter = (AuthService) => {
  const authRouter = Router();
  const authController = new AuthController(AuthService);
  authRouter.post("/login", authController.login);
  authRouter.post("/register", authController.register);
  authRouter.get("/logout", authController.logout);

  return authRouter;
};
