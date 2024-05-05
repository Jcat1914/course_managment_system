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
      if (credentials) {
        validationService.validateData(credentials, facultyCredentialsSchema)

        const newFaculty = await this.facultyService.createFaculty({
          data: {
            Faculty: validatedFaculty,
            Credentials: validatedCredentials
          }
        });
      }
      const newFaculty = await this.facultyService.createFaculty({ data: { Faculty: validatedFaculty } });
      res.status(201).json({ msg: 'Faculty Register Successfully', faculty: newFaculty });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  getFacultyAvailabilities = async (req, res) => {
    try {
      const faculty = await this.facultyService.getFacultyAvailabilities(req.params.id);
      res.status(200).json(faculty);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  addFacultyAvailabilities = async (req, res) => {
    const { id } = req.params;
    const { availability } = req.body;
    try {
      await this.facultyService.addFacultyAvailabilities(id, availability);
      const facultyAvailabilities = await this.facultyService.getFacultyAvailabilities(id);
      const availabilities = facultyAvailabilities.facultyAvailabilities
      const response = {
        facultyId: facultyAvailabilities.id,
        availabilities: availabilities,
        msg: "Availability Added Successfully"
      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error.message });
    }
  }
  updateFacultyAvailability = async (req, res) => {
    const { id } = req.params;
    const { availability } = req.body;
    try {
      await this.facultyService.updateFacultyAvailability(id, availability);
      res.status(200).json({ msg: 'Availability Updated Successfully' });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }

  deleteFacultyAvailability = async (req, res) => {
    const { availabilityId } = req.params;
    try {
      const faculty = await this.facultyService.deleteFacultyAvailability(availabilityId);
      if (!faculty) {
        throw new Error('Could not Delete');
      }
      res.status(200).json({ msg: 'Availability Deleted Successfully' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error.message });
    }
  }

  addFacultyCourses = async (req, res) => {
    const { id } = req.params;
    const { courses } = req.body;
    try {
      const faculty = await this.facultyService.addFacultyCourses(id, courses);
      const facultyCourses = await this.facultyService.getFacultyCourses(id);
      const course = facultyCourses.courses.map(course => (
        {
          id: course.id,
          name: course.name,
          description: course.description,
          courseLevel: course.courseLevel,
          credits: course.credits
        }
      ))
      const response = {
        facultyId: faculty[0].facultyId,
        courses: course,
        msg: "Courses Added Successfully"
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ err: error.message })
    }
  }

  updateFaculty = async (req, res) => {
    const { id } = req.params;

    try {
      const validatedFaculty = validationService.validateData(req.body, facultySchema);
      const updatedFaculty = await this.facultyService.updateFaculty(id, validatedFaculty)
      res.status(200).json({ msg: "Professor Updated Successfully", faculty: updatedFaculty })
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
      res.status(200).json({ msg: 'Course Deleted Successfully' });
    } catch (error) {

      res.status(500).json({ err: error.message });
    }
  }
}
