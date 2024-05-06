export class CourseController {
  constructor({ Course }) {
    this.courseModel = Course;
  }
  getCourses = async (req, res) => {
    try {
      const courses = await this.courseModel.findAll();
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
    const { name, description, courseLevel, credits } = req.body;
    const payload = {
      name: name,
      description: description,
      courseLevel: courseLevel,
      credits: credits,
    }
    try {
      const course = await this.courseModel.findByPk(req.params.id)
      await course.update(payload)
      res.status(200).json({ msg: 'Course updated successfully', course: course })
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
      res.status(200).json({ msg: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
}

