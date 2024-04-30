export class FacultyService {
  constructor({ Faculty, Courses }) {
    this.Faculty = Faculty;
    this.Courses = Courses;
  }
  getFaculties = async () => {
    try {
      return await this.Faculty.findAll();
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  getFacultyCourses = async (id) => {
    try {
      const faculty = await this.Faculty.findOne({
        where: { id: id },
        include: {
          model: this.Courses,
          attributes: ['id', 'name', 'courseLevel', 'credits']
        },
      });
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      return faculty;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  updateFaculty = async (id, data) => {
    try {
      const faculty = await this.Faculty.findByPk(id);
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      return await faculty.update(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getFacultyById = async (id) => {
    try {
      return await this.Faculty.findByPk(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  createFaculty = async ({ data }) => {
    try {
      const faculty = await this.Faculty.create(data.Faculty);
      data.Credentials.facultyId = faculty.id;
      const credentials = await faculty.createFacultyCredential(data.Credentials);
      return { faculty: faculty, credentials: credentials }
    } catch (error) {
      console.log(error)
      throw new Error("Could not create faculty");
    }
  }

  addFacultyCredentials = async (facultyId, credentials) => {
    try {
      const faculty = await this.Faculty.findByPk(facultyId);
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      await faculty.addCredentials(credentials)
    } catch (error) {
      throw new Error(error.message);
    }
  }

  addFacultyCourses = async (facultyId, courseIds) => {
    try {
      const faculty = await this.Faculty.findByPk(facultyId);
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      const courses = await this.Courses.findAll({
        where: {
          id: courseIds
        }
      });
      const newFaculty = await faculty.addCourses(courses);
      return newFaculty
    } catch (error) {
      throw new Error(error.message);
    }
  }
  updateFaculty = async () => {

  }

  updateFacultyCredentials = async (facultyId, credentials) => {
    try {
      const faculty = await this.Faculty.findByPk(facultyId);

      if (!faculty) {
        throw new Error('Faculty not found');
      }
      // Set the new credentials for the faculty
      console.log(credentials)
      await faculty.addFacultyCredentials(credentials);
      return true; // Indicate successful update
    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteFaculty = async (id) => {
    try {
      const faculty = await this.Faculty.findByPk(id);
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      return await faculty.destroy();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteFacultyCourse = async (facultyId, courseId) => {
    try {
      const faculty = await this.Faculty.findByPk(facultyId);
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      return await faculty.removeCourses(courseId);

    } catch (error) {
      throw new Error(error.message);
    }
  }
}
