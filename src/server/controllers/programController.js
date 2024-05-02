import { programSchema } from '../validationSchemas/programSchema.js';
import { validationService } from '../services/validationService.js';
export class ProgramController {
  constructor(ProgramService) {
    this.programService = ProgramService
  }
  getPrograms = async (req, res) => {
    try {
      const programs = await this.programService.getPrograms();
      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getProgramById = async (req, res) => {
    try {
      const { id } = req.params;
      const program = await this.programService.getProgramById(id);
      if (!program) {
        return res.status(404).json({ error: 'Program not found' });
      }
      return res.status(200).json({ program });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  getProgramCourses = async (req, res) => {
    try {
      const { id } = req.params;
      const program = await this.programService.getProgramCourses(id);
      if (!program) {
        return res.status(404).json({ error: 'Program not found' });
      }
      return res.status(200).json({ program });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  }
  updateProgram = async (req, res) => {
    try {
      const { id } = req.params;
      const validatedProgram = await validationService.validateData(req.body, programSchema);
      const program = await this.programService.updateProgram(id, validatedProgram);
      return res.status(200).json({ program });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  createProgram = async (req, res) => {
    try {
      const { program, courses } = req.body
      const validatedProgram = validationService.validateData(program, programSchema);
      const newProgram = await this.programService.createProgram(validatedProgram);
      if (courses) {
        const programWithCourses = await this.programService.addProgramCourses(newProgram.id, courses);
        res.status(201).json(programWithCourses)
      } else {
        res.status(201).json(newProgram);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  addProgramCourses = async (req, res) => {
    try {
      const { id } = req.params;
      const { courses } = req.body;
      const program = await this.programService.addProgramCourses(id, courses);
      res.status(200).json(program);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteProgramCourse = async (req, res) => {
    try {
      const { id, courseId } = req.params;
      await this.programService.deleteProgramCourse(id, courseId);
      res.status(200).json({ msg: `Course deleted from program` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteProgram = async (req, res) => {
    try {
      const { id } = req.params;
      await this.programService.deleteProgram(id);
      res.status(200).json({ msg: `Program deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
