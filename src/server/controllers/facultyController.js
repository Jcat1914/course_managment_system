import { facultySchema, facultyCredentialsSchema } from '../validationSchemas/index.js'
import { validationService } from '../services/index.js'
export class FacultyController {
  constructor(facultyService) {
    this.facultyService = facultyService;
  }
  getFaculties = async (req, res) => {
    try {
      const faculties = await this.facultyService.getFaculties();
      res.json(faculties);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  getFacultyCourses = async (req, res) => {
    try {
      const faculty = await this.facultyService.getFacultyCourses(req.params.id);
      res.status(200).json(faculty);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  getFacultyById = async (req, res) => {
    try {
      const faculty = await this.facultyService.getFacultyById(req.params.id);
      res.json(faculty);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  createFaculty = async (req, res) => {
    const { faculty, credentials } = req.body;
    try {
      const validatedFaculty = validationService.validateData(faculty, facultySchema);
      const validatedCredentials = validationService.validateData(credentials, facultyCredentialsSchema);
      const newFaculty = await this.facultyService.createFaculty({
        data: {
          Faculty: validatedFaculty,
          Credentials: validatedCredentials
        }
      });
      res.status(201).json(newFaculty);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  addFacultyCourses = async (req, res) => {
    const { id } = req.params;
    const { courses } = req.body;
    try {
      const faculty = await this.facultyService.addFacultyCourses(id, courses);
      res.status(200).json(faculty);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  updateFaculty = async (req, res) => {
    const { id } = req.params;
    const { faculty } = req.body;
    try {
      const updatedFaculty = await this.facultyService.updateFaculty(id, faculty);
      res.status(200).json(updatedFaculty);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  updateFacultyCredentials = async (req, res) => {
    const { id } = req.params;
    const { credentials } = req.body;
    try {
      const updatedCredentials = await this.facultyService.updateFacultyCredentials(id, credentials);
      res.status(200).json(updatedCredentials);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  deleteFacultyCourse = async (req, res) => {
    const { id, courseId } = req.params;
    try {
      const faculty = await this.facultyService.deleteFacultyCourse(id, courseId);
      res.status(200).json(faculty);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }
}
