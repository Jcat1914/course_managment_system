import { Router } from 'express';
import { StudentController } from '../controllers/studentController.js';

export function createStudentRouter({ Student, StudentEnrollment, Country, Program }) {
  const studentRouter = Router();
  const studentController = new StudentController({ Student, StudentEnrollment, Country, Program })
  studentRouter.get('/', studentController.getStudents);
  // studentRouter.get('/:id', studentController.getStudentById);
  studentRouter.post('/add', studentController.createStudent);
  studentRouter.get('/enrollment/:id', studentController.getStudentEnrollments);
  // studentRouter.put('/:id', studentController.updateStudent);
  studentRouter.put('/enrollment/:id', studentController.updateStudentStatus);

  return studentRouter;
}


