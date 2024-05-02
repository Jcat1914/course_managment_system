import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

export function createUserRouter(userService) {
  const studentRouter = Router();
  const userController = new UserController(userService);
  studentRouter.get('/', userController.getUsers);
  // studentRouter.get('/:id', studentController.getStudentById);
  studentRouter.put('/:id', userController.updateUser)
  // studentRouter.put('/:id', studentController.updateStudent);
  studentRouter.delete('/:id', userController.deleteUser);

  return studentRouter;
}


