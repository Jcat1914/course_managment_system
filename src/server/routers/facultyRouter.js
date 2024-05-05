import { Router } from 'express';
import { FacultyController } from '../controllers/facultyController.js';
export const createFacultyRouter = (facultyService) => {
  const facultyRouter = Router();
  const facultyController = new FacultyController(facultyService);

  facultyRouter.get('/', facultyController.getFaculties);
  facultyRouter.get('/:id', facultyController.getFacultyById);
  facultyRouter.get('/:id/courses', facultyController.getFacultyCourses);
  facultyRouter.post('/add', facultyController.createFaculty);
  facultyRouter.post('/:id/courses', facultyController.addFacultyCourses);
  facultyRouter.delete('/availability/:availabilityId', facultyController.deleteFacultyAvailability);
  facultyRouter.delete('/:id/course/:courseId', facultyController.deleteFacultyCourse);
  facultyRouter.put('/:id', facultyController.updateFaculty);
  facultyRouter.put('/:id/credentials', facultyController.updateFacultyCredentials);
  facultyRouter.put('/availability/:id', facultyController.updateFacultyAvailability);

  facultyRouter.get('/:id/availability', facultyController.getFacultyAvailabilities);
  facultyRouter.post('/:id/availability', facultyController.addFacultyAvailabilities);


  return facultyRouter;
}
