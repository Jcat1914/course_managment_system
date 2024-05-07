import { studentSchema } from '../validationSchemas/index.js'
import { enrollmentSchema } from '../validationSchemas/index.js'
import { validationService } from '../services/index.js'
import { ValidationError } from '../helpers/errors.js'
import multer from 'multer'
import { parseExcelFile } from '../helpers/parseExcelFile.js'
import { Student, Country } from '../models/index.js'
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
      const data = students.map(student => (
        {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          institutionalEmail: student.institutionalEmail,
          personalEmail: student.personalEmail,
          phoneNumber: student.phoneNumber,
          country: student.country.name,
          DOB: student.DOB,
          gender: student.gender,
          countryId: student.countryId
        }
      ))

      res.status(200).json({ students: data });
    } catch (e) {
      res.status(500).json({ msg: "Could not load students", error: e });
      console.log(e)
    }
  };

  addDataFromExcel = async (req, res) => {
    const upload = multer().single('file');

    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({
          error: 'An error occurred while uploading file',
        });
      }

      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'Missing file' });
      }

      try {
        const studentsData = await parseExcelFile(file.buffer);
        const createdStudents = [];

        for (const studentData of studentsData) {
          let student;
          student = await Student.create({
            id: studentData.id,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            personalEmail: studentData.personalEmail,
            institutionalEmail: studentData.institutionalEmail,
            phoneNumber: studentData.phoneNumber,
            gender: studentData.gender,
            DOB: studentData.DOB,
            countryId: studentData.countryId,
          });
          await student.save();
          createdStudents.push(student);
        }

        // Reload created students with associated country data
        await Promise.all(createdStudents.map(async (student) => {
          await student.reload({ include: Country });
        }));

        res.status(201).json({
          message: 'Students uploaded successfully',
          createdStudents,
        });
      } catch (error) {
        console.error('Error uploading students:', error);
        res.status(500).json({
          error: 'An error occurred while uploading students',
        });
      }
    });
  };

  getStudentEnrollments = async (req, res) => {
    const { id } = req.params;
    try {
      const enrollments = await this.studentEnrollmentModel.findAll({
        where: { studentId: id }, include: {
          model: this.programModel,
          attributes: ['name']
        }
      })
      if (enrollments) {
        const data = enrollments.map(enrollment => (
          {
            id: enrollment.id,
            programId: enrollment.programId,
            program: enrollment.program.name,
            status: enrollment.status,
            startDate: enrollment.startDate,
            graduationDate: enrollment.graduationDate,
            cumulativeGPA: enrollment.cumulativeGPA,
            credits: enrollment.credits
          }
        ))
        res.status(200).json({ enrollments: data })
      } else {
        res.status(404).json({ msg: `Student with id ${id} not found` });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

  updateEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
      const enrollment = await this.studentEnrollmentModel.findByPk(id);
      const validEnrollment = validationService.validateData(req.body, enrollmentSchema);
      await enrollment.update(validEnrollment);
      res.status(200).json({ msg: 'Enrollment updated successfully', enrollment: enrollment });
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

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
  addEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
      const validEnrollment = validationService.validateData(req.body, enrollmentSchema);
      if (validEnrollment.error) {
        throw new ValidationError(validEnrollment.error);
      }
      validEnrollment.studentId = id;
      await this.studentEnrollmentModel.create(validEnrollment);
      res.status(201).json({ msg: "Enrollment added successfully" });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(403).json({ msg: "Invalid data", error: error.message });
      } else {
        console.log(error)
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  }

  updateStudent = async (req, res) => {
    const { id } = req.params;
    try {
      const student = await this.studentModel.findByPk(id);

      const validUser = validationService.validateData(req.body, studentSchema);
      await student.update(validUser);

      res.status(200).json({ msg: 'Student updated successfully', student: student });
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: 'Internal Server Error' });
    }
  }

  updateStudentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const enrolmmentStatus = ['drop', 'active', 'graduated']
    if (!enrolmmentStatus.includes(status)) {
      return res.status(400).json({ msg: "Invalid status" })
    }
    try {
      await this.studentEnrollmentModel.update({ status: status }, { where: { id: id } })
      res.status(200).json({ msg: `Status Updated successfully` });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
}
