import { createApp } from './app.js'
import { sequelize } from './database/conexion.js'

import * as models from './models/index.js'
import { FacultyService, AuthService, UserService, ProgramService, TermService } from './services/index.js'
async function main() {
  try {
    // await sequelize.sync({ force: false })
    const facultyService = new FacultyService({ Faculty: models.Faculty, Courses: models.Course, FacultyAvailability: models.FacultyAvailability })
    const authService = new AuthService(models.User)
    const userService = new UserService(models.User)
    const programService = new ProgramService(models.Program)
    const termService = new TermService(models.Term)
    createApp({ models, services: { facultyService: facultyService, authService: authService, userService: userService, programService, termService } })
  } catch (error) {
    console.error('Unable to start the application: ', error);
  }
}
main()
