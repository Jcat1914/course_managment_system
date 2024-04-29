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


}

