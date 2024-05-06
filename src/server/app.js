import { createStudentRouter } from "./routers/studentRouter.js"
import express from "express";
import session from "express-session";
import { createCourseRouter } from "./routers/courseRouter.js";
import { createAuthRouter } from "./routers/authRouter.js";
import { createFacultyRouter } from "./routers/facultyRouter.js";
import { createUserRouter } from "./routers/userRouter.js";
import ViteExpress from "vite-express";
import { createProgramRouter } from "./routers/programRouter.js";
import { createTermRouter } from "./routers/termRouter.js";

export const createApp = ({ models, services }) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "060c33d41106139911821cbb366f0532",
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  //app.use("/api/v1/admin", createAdminRouter({ User: models.User }));
  app.use("/api/v1/auth", createAuthRouter(services.authService));
  app.use("/api/v1/users", createUserRouter(services.userService))
  app.use("/api/v1/student", createStudentRouter({ Student: models.Student, StudentEnrollment: models.StudentEnrollment, Country: models.Country, Program: models.Program }))
  app.use("/api/v1/faculty", createFacultyRouter(services.facultyService))
  app.use('/api/v1/course', createCourseRouter({ Course: models.Course }));
  app.use('/api/v1/program', createProgramRouter(services.programService))
  app.use('/api/v1/term', createTermRouter(services.termService))
  app.get('/api/v1/country', async (req, res) => {
    try {
      const countries = await models.Country.findAll();
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })


  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000..."),
  );
}
