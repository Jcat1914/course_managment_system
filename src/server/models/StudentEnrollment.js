import { sequelize } from "../database/conexion.js";
import { DataTypes } from "sequelize";
import { Student } from "./Student.js";
import { Program } from "./Program.js";

export const StudentEnrollment = sequelize.define("StudentEnrollment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false
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
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
});

StudentEnrollment.belongsTo(Student)
StudentEnrollment.belongsTo(Program);
Program.hasMany(StudentEnrollment);
Student.hasMany(StudentEnrollment);
