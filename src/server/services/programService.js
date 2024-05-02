export class ProgramService {
  constructor(Program) {
    this.Program = Program;
  }
  getPrograms = async () => {
    try {
      console.log(this.Program)
      return await this.Program.findAll();
    } catch (error) {
      throw new Error("Could not fetch programs")
    }
  };

  getProgramById = async (id) => {
    try {
      return await this.Program.findByPk(id);
    } catch (error) {
      throw new Error("Could not fetch program")
    }
  }

  getProgramCourses = async (id) => {
    try {
      return await this.Program.findByPk(id, {
        include: {
          association: 'courses',
          attributes: ['id', 'name', 'description', 'courseLevel', 'credits']
        }
      });
    } catch (error) {
      console.log(error.message)
      throw new Error("Could not fetch program courses")
    }
  }

  createProgram = async (program) => {
    try {
      return await this.Program.create(program);
    } catch (error) {
      throw new Error("Could not create program")
    }
  }

  addProgramCourses = async (id, courseIds) => {
    try {
      const program = await this.Program.findByPk(id);
      console.log(courseIds)
      if (!program) {
        throw new Error('Program not found');
      }
      await program.addCourses(courseIds);
      await program.reload({ include: 'courses' });
      return program;
    } catch (error) {
      throw new Error("Could not add course to program")
    }
  }

  updateProgram = async (id, data) => {
    try {
      const program = await this.Program.findByPk(id);
      if (!program) {
        throw new Error('Program not found');
      }
      return await program.update(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteProgramCourse = async (id, courseId) => {
    try {
      const program = await this.Program.findByPk(id);
      if (!program) {
        throw new Error('Program not found');
      }
      await program.removeCourse(courseId);
    } catch (error) {
      throw new Error("Could not delete course from program")
    }
  }

  deleteProgram = async (id) => {
    try {
      const program = await this.Program.findByPk(id);
      if (!program) {
        throw new Error('Program not found');
      }
      program.status = 'inactive'

      return await program.save();
    } catch (error) {
      throw new Error("Could not delete program")
    }
  }


}
