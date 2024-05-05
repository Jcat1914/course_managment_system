
export class FacultyService {
  constructor({ Faculty, Courses, FacultyAvailability }) {
    this.Faculty = Faculty;
    this.Courses = Courses;
    this.FacultyAvailability = FacultyAvailability;
  }
  getFaculties = async () => {
    try {
      return await this.Faculty.findAll({
        attributes: ['id', 'firstName', 'lastName', 'phoneNumber', 'institutionalEmail', 'personalEmail', 'DOB', 'status'],
        include: [
          {
            association: 'courses',
          },
          {
            association: 'facultyAvailabilities'
          }
        ]
      })
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
        arrtibutes: ['id', 'firstName', 'lastName', 'phoneNumber', 'institutionalEmail', 'personalEmail', 'DOB', 'status']
      });
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      return faculty;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getFacultyAvailabilities = async (id) => {
    try {
      const faculty = await this.Faculty.findOne({
        where: { id: id },
        include: {
          association: 'facultyAvailabilities',
          attributes: ['id', 'day', 'startTime', 'endTime']
        },
        attributes: ['id', 'firstName', 'lastName', 'phoneNumber', 'institutionalEmail', 'personalEmail', 'DOB', 'status']
      });
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      return faculty;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  updateFacultyAvailability = async (id, data) => {
    try {
      const availability = await this.FacultyAvailability.findByPk(id);
      if (!availability) {
        throw new Error('Availability not found');
      }
      await availability.update(data);
      await availability.reload();
      return availability;
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
      await faculty.update(data);
      await faculty.reload({
        include: [
          {
            association: 'facultyAvailabilities'
          },
          {
            association: 'courses'
          }
        ],
        attributes: ['id', 'firstName', 'lastName', 'phoneNumber', 'institutionalEmail', 'personalEmail', 'DOB', 'status']
      });
      return faculty;
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
      if (data.Credentials) {
        data.Credentials.facultyId = faculty.id;
        await faculty.createFacultyCredential(data.Credentials);
      }
      await faculty.reload({
        include: [
          {
            association: 'facultyAvailabilities'
          },
          {
            association: 'courses'
          }
        ],
        attributes: ['id', 'firstName', 'lastName', 'phoneNumber', 'institutionalEmail', 'personalEmail', 'DOB', 'status']
      });
      return faculty
    } catch (error) {
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

  addFacultyAvailabilities = async (facultyId, availabilities) => {
    try {
      const faculty = await this.Faculty.findByPk(facultyId);
      if (!faculty) {
        throw new Error('Faculty not found');
      }
      for (let availability of availabilities) {
        await faculty.createFacultyAvailability(availability);
      }
      return faculty;
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
      const newFaculty = await faculty.addCourses(courseIds);
      return newFaculty
    } catch (error) {
      throw new Error(error.message);
    }
  }

  updateFacultyCredentials = async (facultyId, credentials) => {
    try {
      const faculty = await this.Faculty.findByPk(facultyId);

      if (!faculty) {
        throw new Error('Faculty not found');
      }
      // Set the new credentials for the faculty
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

  deleteFacultyAvailability = async (availabilityId) => {
    try {
      const availability = await this.FacultyAvailability.findByPk(availabilityId)
      if (!availability) {
        throw new Error('Availability not found');
      }

      await availability.destroy();
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
