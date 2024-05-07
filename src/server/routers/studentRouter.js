import { Router } from 'express';
import { StudentController } from '../controllers/studentController.js';

export function createStudentRouter({ Student, StudentEnrollment, Country, Program }) {
  const studentRouter = Router();
  const studentController = new StudentController({ Student, StudentEnrollment, Country, Program })
  studentRouter.get('/', studentController.getStudents);
  // studentRouter.get('/:id', studentController.getStudentById);
  studentRouter.post('/add', studentController.createStudent);
  studentRouter.post('/enrollment/add/:id', studentController.addEnrollment)
  studentRouter.get('/enrollment/:id', studentController.getStudentEnrollments);
  studentRouter.put('/:id', studentController.updateStudent);
  studentRouter.patch('/enrollment/:id', studentController.updateStudentStatus);
  studentRouter.post('/add-from-excel', studentController.addDataFromExcel);

  return studentRouter;
}


