import { createApp } from './app.js'
import { sequelize } from './database/conexion.js'

import * as models from './models/index.js'
import { FacultyService, AuthService, UserService, ProgramService } from './services/index.js'
async function main() {
  try {
    // await sequelize.sync({ force: false })
    const faculyService = new FacultyService({ Faculty: models.Faculty, Courses: models.Course, FacultyAvailability: models.FacultyAvailability })
    const authService = new AuthService(models.User)
    const userService = new UserService(models.User)
    const programService = new ProgramService(models.Program)
    createApp({ models, services: { facultyService: faculyService, authService: authService, userService: userService, programService } })
  } catch (error) {
    console.error('Unable to start the application: ', error);
  }
}
main()
