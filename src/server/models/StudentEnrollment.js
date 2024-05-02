import { sequelize } from "../database/conexion.js";
import { DataTypes } from "sequelize";
import { Student } from "./Student.js";
import { Program } from "./Program.js";

export const StudentEnrollment = sequelize.define("studentEnrollment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  graduationDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  cumulativeGPA: {
    type: DataTypes.FLOAT,
    allowNull: true,
    delaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('drop', 'active', 'graduated'),
    defaultValue: 'active'
  }
});

StudentEnrollment.belongsTo(Student)
StudentEnrollment.belongsTo(Program);
Program.hasMany(StudentEnrollment);
Student.hasMany(StudentEnrollment);
