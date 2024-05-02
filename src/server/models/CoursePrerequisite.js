import { sequelize } from "../database/conexion.js";
import { DataTypes } from "sequelize";
import { Course } from "./Course.js";

export const CoursePrerequisite = sequelize.define("coursePrerequisite", {
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  preRequisiteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
});

CoursePrerequisite.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
CoursePrerequisite.belongsTo(Course, { foreignKey: 'preRequisiteId', as: 'preRequisite' });
