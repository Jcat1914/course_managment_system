import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

export function createUserRouter(userService) {
  const studentRouter = Router();
  const userController = new UserController(userService);
  studentRouter.get('/', userController.getUsers);
  studentRouter.put('/:id', userController.updateUser)
  studentRouter.delete('/:id', userController.deleteUser);
  studentRouter.post('/add-from-excel', userController.addUserFromExcel);

  return studentRouter;
}


