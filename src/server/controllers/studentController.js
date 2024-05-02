import { studentSchema } from '../validationSchemas/index.js'
import { enrollmentSchema } from '../validationSchemas/index.js'
import { validationService } from '../services/index.js'
import { ValidationError } from '../helpers/errors.js'
export class StudentController {
  constructor({ Student, StudentEnrollment, Country, Program }) {
    this.studentModel = Student;
    this.CountryModel = Country;
    this.programModel = Program;
    this.studentEnrollmentModel = StudentEnrollment;
  }

  getStudents = async (req, res) => {
    try {
      const students = await this.studentModel.findAll({ include: this.CountryModel })
      res.status(200).json(students);
    } catch (e) {
      res.status(500).json({ msg: "Could not load students", error: e });
      console.log(e)
    }

  };

  getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await this.studentModel.findByPk(id, { include: this.CountryModel });
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ msg: `Student with id ${id} not found` });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

  createStudent = async (req, res) => {
    const { student, enrollment } = req.body;
    try {
      const validatedUser = validationService.validateData(student, studentSchema);
      const validEnrollment = validationService.validateData(enrollment, enrollmentSchema);
      const newStudent = await this.studentModel.create(validatedUser)
      //const id = newStudent.id;
      //enrollment.studentId = id;
      await newStudent.createStudentEnrollment(validEnrollment);

      await newStudent.reload({ include: this.studentEnrollmentModel })
      //const studentEnrollment = await this.studentEnrollmentModel.create(validEnrollment);
      res.status(201).json({ student: newStudent });
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(403).json({ msg: "Invalid data", error: e.message });
      } else {
        res.status(500).json({ msg: "Could not create student" });
        console.log(e)
      }
    }
  }

  updateStudent = async (req, res) => {
    try {
      const validUser = validationService.validate(req.body, studentSchema);
      const student = await this.studentModel.update(validUser, {
        where: {
          id: validUser.id
        }
      });
      res.status(200).json({ msg: 'Student updated successfully', student: student });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

  deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
      await this.studentModel.destroy({
        where: {
          id: id
        }
      });
      res.status(200).json({ msg: `Student deleted successfully` });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  updateStudentStatus = async (req, res) => {
  }
}
