import { createApp } from './app.js'
import { sequelize } from './database/conexion.js'
import * as models from './models/index.js'
import { FacultyService, AuthService } from './services/index.js'
async function main() {
  try {
    // await sequelize.sync({ force: true })
    const faculyService = new FacultyService({ Faculty: models.Faculty, Courses: models.Course })
    const authService = new AuthService(models.User)
    createApp({ models, services: { facultyService: faculyService, authService: authService } })
  } catch (error) {
    console.error('Unable to start the application: ', error);
  }
}
main()
