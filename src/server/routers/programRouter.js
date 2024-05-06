
import { Router } from 'express';
import { ProgramController } from '../controllers/programController.js';
export const createProgramRouter = (programService) => {
  const programRouter = Router();
  const programController = new ProgramController(programService);

  programRouter.get('/', programController.getPrograms);
  programRouter.get('/:id', programController.getProgramById);
  programRouter.get('/:id/courses', programController.getProgramCourses);
  programRouter.post('/add', programController.createProgram);
  programRouter.post('/:id/courses', programController.addProgramCourses);
  programRouter.delete('/:id/course/:courseId', programController.deleteProgramCourse);
  programRouter.put('/:id', programController.updateProgram);
  programRouter.delete('/:id', programController.deleteProgram);

  return programRouter;
}
