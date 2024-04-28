import { Router } from 'express';
import { StudentController } from '../controllers/studentController.js';

export function createStudentRouter({ Student, StudentEnrollment, City, Program }) {
  const studentRouter = Router();
  const studentController = new StudentController({ Student, StudentEnrollment, City, Program })
  studentRouter.get('/', studentController.getStudents);
  // studentRouter.get('/:id', studentController.getStudentById);
  studentRouter.post('/add', studentController.createStudent);
  // studentRouter.put('/:id', studentController.updateStudent);
  studentRouter.delete('/:id', studentController.deleteStudent);

  return studentRouter;
}


