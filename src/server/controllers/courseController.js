export class CourseController {
  constructor({ Course }) {
    this.courseModel = Course;
  }
  getCourses = async (req, res) => {
    try {
      const courses = await this.cityModel.findAll();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
      const course = await this.courseModel.findOne({
        where: { id: id }
      })
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  addCourse = async (req, res) => {
    const { name, description, courseLevel, credits } = req.body;

    console.log(req.body)
    try {
      const course = await this.courseModel.create({
        name: name,
        description: description,
        courseLevel: courseLevel,
        credits: credits
      })
      res.status(201).json({ msg: 'Course added successfully', course: course });
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  updateCourse = async (req, res) => {
    const { id, name, description, courseLevel, credits } = req.body;
    const course = {
      id: id,
      name: name,
      description: description,
      courseLevel: courseLevel,
      credits: credits,
    }
    try {
      const updatedCourse = await this.courseModel.update(course, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json({ msg: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
  deleteCourse = async (req, res) => {
    try {
      const course = await this.courseModel.destroy({
        where: {
          id: req.params.id
        }
      });
      console.lgo(course)
      res.status(200).json({ msg: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
}

