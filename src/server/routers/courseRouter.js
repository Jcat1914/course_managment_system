import { CourseController } from '../controllers/courseController.js';
import { Router } from 'express';
export const createCourseRouter = ({ Course }) => {
  const courseController = new CourseController({ Course });
  const router = Router();
  router.get('/', courseController.getCourses);
  router.get('/:id', courseController.getCourseById);
  router.post('/add', courseController.addCourse);
  router.put('/update', courseController.updateCourse);
  router.delete('/:id', courseController.deleteCourse);
  return router;
};
