import { studentSchema } from '../validationSchemas/index.js'
import { enrollmentSchema } from '../validationSchemas/index.js'
import { validationService  } from '../services/index.js'
export class StudentController {
  constructor({ Student, StudentEnrollment, City, Program }) {
    this.studentModel = Student;
    this.cityModel = City;
    this.programModel = Program;
    this.studentEnrollmentModel = StudentEnrollment;
  }

  getStudents = async (req, res) => {
    try {
      const students = await this.studentModel.findAll({ include: this.cityModel })
      res.status(200).json(students);
    } catch (e) {
      res.status(500).json({ msg: "Could not load students", error: e });
      console.log(e)
    }

  };

  getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await this.studentModel.findByPk(id, { include: this.cityModel });
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
    const validatedUser = validationService.validateData(student, studentSchema);
    try {
      const student = await this.studentModel.create(validatedUser)
      const id = student.id;
      enrollment.studentId = id;
      const validEnrollment = validationService.validateData(enrollment, enrollmentSchema);
      const studentEnrollment = await this.studentEnrollmentModel.create(validEnrollment);
      res.status(201).json(student);
      
    } catch (e) {

      res.status(500).json({ msg: "Could not create student", error: e });
      console.log(e)
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
