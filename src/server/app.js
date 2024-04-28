import { createStudentRouter } from "./routers/studentRouter.js"
import express from "express";
import session from "express-session";
import { createCityRouter } from "./routers/cityRouter.js";
import { createCourseRouter } from "./routers/courseRouter.js";
import { createAuthRouter } from "./routers/authRouter.js";
import ViteExpress from "vite-express";

export const createApp = ({ models }) => {
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
  app.use("/api/v1/auth", createAuthRouter({ User: models.User }));

  app.use("/api/v1/city", createCityRouter({ City: models.City, Country: models.Country }));

  app.use("/api/v1/student", createStudentRouter({ Student: models.Student, StudentEnrollment: models.StudentEnrollment, City: models.City, Program: models.Program }))

  app.use('/api/v1/courses', createCourseRouter({ Course: models.Course }));


  ViteExpress.listen(app, 3000, () =>
    console.log("Server is listening on port 3000..."),
  );
}
