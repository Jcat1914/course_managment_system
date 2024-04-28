import { sequelize } from "../database/conexion.js";
import { Student } from "./Student.js";
import { DataTypes } from "sequelize";
import { Course } from "./Course.js";
import { Term } from "./Term.js";
import { Faculty } from "./Faculty.js";
import { Room } from "./Room.js";

export const TermSchedule = sequelize.define("termSchedule", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  termId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  facultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  roomId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('full', 'available'),
    allowNull: false
  }
});

// Associations
TermSchedule.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
TermSchedule.belongsTo(Term, { foreignKey: 'termId', as: 'term' });
TermSchedule.belongsTo(Faculty, { foreignKey: 'facultyId', as: 'faculty' });
TermSchedule.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
TermSchedule.belongsToMany(Student, { through: 'studentTermSchedule' });
Student.belongsToMany(TermSchedule, { through: 'studentTermSchedule' });
